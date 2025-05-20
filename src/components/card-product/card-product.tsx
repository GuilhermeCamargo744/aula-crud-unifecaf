import { useThemeColor } from "@/hooks/useThemeColor";
import { calculatePercent } from "@/src/utils/calculate-percent";
import { money } from "@/src/utils/money";
import { theme } from "@/src/utils/theme";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

export const CardItemList = ({ item }: any) => {
  return (
    <TouchableOpacity
      style={[
        styles.itemContainer,
        {
          borderColor: theme.colors.gray_200,
          backgroundColor: theme.colors.white,
        },
      ]}
    >
      <Image
        source={{ uri: item?.thumbnail }}
        resizeMode="contain"
        style={styles.imageItem}
      />
      <View
        style={[styles.itemDetails, { borderTopColor: theme.colors.gray_200 }]}
      >
        <Text style={[styles.itemTitle, { fontSize: theme.fontSizes.sm }]}>
          {item?.title}
        </Text>
        <Text
          style={[
            styles.itemDescription,
            { fontSize: theme.fontSizes.xs, color: theme.colors.background },
          ]}
        >
          {item?.description}
        </Text>
        <View style={styles.contentAmount}>
          {item?.discountPercentage && (
            <Text
              numberOfLines={1}
              style={[
                styles.discountText,
                {
                  fontSize: theme.fontSizes.md,
                  color: theme.colors.red,
                  fontFamily: theme.fonts.medium,
                },
              ]}
            >
              {money(calculatePercent(item?.price, item?.discountPercentage))}
            </Text>
          )}
          <Text
            numberOfLines={1}
            style={[
              styles.itemPrice,
              {
                fontSize: item?.discountPercentage
                  ? theme.fontSizes.md
                  : theme.fontSizes.sm,
                color: theme.colors.background,
                fontFamily: theme.fonts.medium,
                textDecorationLine: item?.discountPercentage
                  ? "line-through"
                  : "none",
              },
            ]}
          >
            {money(item?.price.toFixed(2))}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    margin: 10,
    borderWidth: 1,
    borderRadius: 8,
  },
  imageItem: {
    width: "100%",
    height: 120,
    borderRadius: 5,
  },
  itemDetails: {
    justifyContent: "space-between",
    alignItems: "flex-start",
    padding: 8,
    borderTopWidth: 0.5,
    width: "100%",
    flex: 1,
  },
  itemTitle: {
    fontWeight: "bold",
    textAlign: "left",
    marginBottom: 8,
  },
  itemDescription: {
    textAlign: "left",
  },
  contentAmount: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-end",
    marginTop: 8,
    width: "100%",
    overflow: "scroll",
  },
  itemPrice: {
    textDecorationLine: "none",
  },
  discountText: {
    marginRight: 8,
  },
});
