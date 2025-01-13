const checkExistence = (variant, list, targetedItem) => {
  if (variant === "addCase") {
    return list?.find((item) => item.title === targetedItem.title);
  }

  if (variant === "updateCase") {
    return list.find(
      (item) =>
        item.title === targetedItem.title && item["_id"] !== targetedItem.id
    );
  }
};

export { checkExistence };
