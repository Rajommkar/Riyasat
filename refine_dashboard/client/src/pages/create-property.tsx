import { useState } from "react";
import { useGetIdentity } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import { FieldValues } from "react-hook-form";

import Form from "../components/common/Form";

const CreateProperty = () => {
  const { data: user } = useGetIdentity<{
    email: string;
    name: string;
    avatar: string;
  }>();
  
  const [propertyImage, setPropertyImage] = useState({ name: "", url: "" });
  const {
    refineCore: { onFinish, formLoading },
    register,
    handleSubmit,
  } = useForm({
    refineCoreProps: {
      errorNotification: () => {
        return {
          message: "Error creating property",
          description: "The fake REST API doesn't support large base64 images. It's time to build the backend!",
          type: "error",
        };
      },
    },
  });

  const handleImageChange = (file: File) => {
    if (!file) return;
    const reader = (readFile: File) =>
      new Promise<string>((resolve) => {
        const fileReader = new FileReader();
        fileReader.onload = () => resolve(fileReader.result as string);
        fileReader.readAsDataURL(readFile);
      });

    reader(file).then((result: string) =>
      setPropertyImage({ name: file?.name, url: result }),
    );
  };

  const onFinishHandler = async (data: FieldValues) => {
    if (!propertyImage.name) return alert("Please select an image");

    await onFinish({
      ...data,
      photo: propertyImage.url,
      email: user?.email,
    });
  };

  return (
    <Form
      type="Create"
      register={register}
      onFinish={onFinish}
      formLoading={formLoading}
      handleSubmit={handleSubmit}
      handleImageChange={handleImageChange}
      onFinishHandler={onFinishHandler}
      propertyImage={propertyImage}
    />
  );
};

export default CreateProperty;
