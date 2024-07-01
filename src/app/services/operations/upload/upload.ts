import axios from "axios";
import { apiConnector } from "../../apiConnector";
import { uploadFilesEndPoint } from "../../apis";
import {
  removeAllQueryParams,
  removeQueryParameters,
} from "@/app/utils/helper";

const { DELETE_SINGLE_OBJECT, UPLOAD_SINGLE_OBJECT } = uploadFilesEndPoint;

export const uploadSingleObject = async (data: {
  fileName: string;
  fileType: string;
}) => {
  try {
    const response = await apiConnector({
      method: "POST",
      url: UPLOAD_SINGLE_OBJECT,
      bodyData: data,
    });

    const responseData = response.data.data;

    return responseData.preSignedUrl;
  } catch (err) {
    throw err;
  }
};

export const deleteSingleObject = async (filePath: string) => {
  try {
    const response = await apiConnector({
      method: "DELETE",
      url: DELETE_SINGLE_OBJECT + "?filePath=" + filePath,
    });

    return response.data.data;
  } catch (err) {
    throw err;
  }
};

export const uploadToTheServer = async (
  url: string,
  data: string,
  contentType: string,
) => {
  try {
    const response = await axios.put(url, data, {
      headers: {
        "x-amz-acl": "public-read",
        "Content-Type": contentType,
      },
    });

    if (response.status === 200) return true;
    else throw "";
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const uploadImages = async (image: string, fileType: string = "png") => {
  try {
    const [prefix, base64Data] = image.split(",");
    console.log(prefix);
    const contentType =
      prefix.match(/data:(.*);base64/)?.[1] || "application/octet-stream";
    // Decode the base64 string to get the image binary data
    const buffer = Buffer.from(base64Data, "base64") as any;

    // generating presinged url
    const preSignedUrl = await uploadSingleObject({
      fileName: String(Date.now()),
      fileType: fileType,
    });

    // upload to the url
    const isUploaded = await uploadToTheServer(
      preSignedUrl,
      buffer,
      contentType,
    );

    if (isUploaded) return removeQueryParameters(preSignedUrl);
    else throw "";
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const deleteImageFromServer = async (url: string) => {
  try {
    const url_ob = new URL(url);
    const filePath = url_ob.pathname;

    const response = await deleteSingleObject(filePath);

    return true;
  } catch (err) {
    return false;
    console.log(err);
  }
};
