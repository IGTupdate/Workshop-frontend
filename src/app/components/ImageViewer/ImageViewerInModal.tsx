import { Image, Modal, Typography } from "antd";
import React from "react";

const { Title } = Typography;

type Props = {
  images: string[];
  open: boolean;
  title: string;
  onClose: any;
};

const ImageViewerInModal = (props: Props) => {
  console.log(props.images);
  return (
    <div>
      <Modal
        width={"70%"}
        style={{ minWidth: "350px" }}
        open={props.open}
        onCancel={props.onClose}
        footer={() => <></>}
      >
        <div className="bg-red">
          <div className="mb-4">
            <Title level={4}>{props.title}</Title>
          </div>
          <Image.PreviewGroup>
            <div className="flex flex-wrap gap-4 md:justify-start justify-center">
              {props.images.map((img, index) => {
                return (
                  <div key={index} className="border">
                    <Image width={200} alt={props.title} src={img} />
                  </div>
                );
              })}
            </div>
          </Image.PreviewGroup>
        </div>
      </Modal>
    </div>
  );
};

export default ImageViewerInModal;
