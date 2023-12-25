import { useToast } from "primevue/usetoast";

export default () => {
  const toast = useToast();
  const error = (
    message: string = "Coś poszło nie tak, spróbuj ponownie...",
    title: string = "Wystąpił błąd"
  ) => {
    toast.add({
      severity: "error",
      summary: title,
      detail: message,
      life: 5000,
      styleClass: "toast",
    });
  };

  const success = (message: string) => {
    toast.add({
      severity: "success",
      detail: message,
      life: 3000,
      styleClass: "toast",
    });
  };

  return { error, success };
};
