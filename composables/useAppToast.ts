import { useToast } from "primevue/usetoast";

export default () => {
    const toast = useToast();
    const error = (message: string = "Coś poszło nie tak, spróbuj ponownie...", title: string = "Wystąpił błąd") => {
        toast.add({
            severity: "error",
            summary: title,
            detail: message,
            life: 5000,
            styleClass:"toast"
          });
    }

    return { error }
}