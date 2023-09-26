export default () => {
    const route = useRoute();
    const page = ref((route.query.page || "1") as string);

    return { page }
}