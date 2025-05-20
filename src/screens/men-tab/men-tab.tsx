import { CardItemList } from "@/src/components/card-product/card-product";
import { api } from "@/src/utils/server-config";
import { useEffect, useState } from "react";
import { FlatList, Text } from "react-native";

export const MenTab = () => {
  const [value, setValue] = useState([]);
  const mensShirtsModel = async () => {
    return await api.get("/products/category/mens-shirts").then((response) => {
      setValue(response.data);
      return response;
    });
  };

  useEffect(() => {
    mensShirtsModel();
  }, []);

  console.log("value", value);

  return (
    <FlatList
      data={value.products}
      keyExtractor={(subItem) => String(subItem.id)}
      numColumns={2}
      renderItem={({ item }) => {
        console.log("item", item);
        return <CardItemList item={item} />;
      }}
    />
  );
};
