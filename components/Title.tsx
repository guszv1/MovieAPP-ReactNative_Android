import { Text } from "react-native";

type TitleProp = {
  text: string;
};
const Title = ({ text }: TitleProp) => {
  return <Text className="text-4xl text-center my-8">{text}</Text>;
};

export default Title;
