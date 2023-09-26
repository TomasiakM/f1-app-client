export default (page: Ref<string>, refresh: () => any) => {
    const route = useRoute();

    watch(
        () => route.query.page,
        () => {
          if (route.query.page === "1") {
            route.query.page = null;
            return;
          }
      
          page.value = (route.query.page || "1") as string;
          refresh();
        }
      );

    return { page }
}