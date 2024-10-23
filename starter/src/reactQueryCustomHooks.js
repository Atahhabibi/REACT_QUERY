import { useQuery } from "@tanstack/react-query";
import customFetch from "./util";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const usefetchTask = () => {
  const { isLoading, data, isError } = useQuery({
    queryKey: ["tasks"],
    queryFn: () => customFetch.get("/")
  });

  return { isLoading, isError, data };
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  const { mutate: deleteTask } = useMutation({
    mutationFn: ({ taskId }) => {
      return customFetch.delete(`/${taskId}`);
    },

    onSuccess: () => {
      toast.success("Task deleted");
      queryClient.invalidateQueries({ queryKey: "tasks" });
    },
    onError: (error) => {
      toast.error(error.response.data.msg);
    }
  });

  return { deleteTask };
};

export const useEditTask = () => {
  const queryClient = useQueryClient();

  const { mutate: editTask } = useMutation({
    mutationFn: ({ taskId, isDone }) => {
      return customFetch.patch(`/${taskId}`, { isDone });
    },

    onSuccess: () => {
      toast.success("Task edited");
      queryClient.invalidateQueries({ queryKey: "tasks" });
    },
    onError: (error) => {
      toast.error(error.response.data.msg);
    }
  });

  return { editTask };
};

export const useCreateTask = (name) => {
  const queryClient = useQueryClient();
  const { mutate: createTask, isLoading } = useMutation({
    mutationFn: (taskTitle) => customFetch.post("/", { title: taskTitle }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: "tasks" });
      toast.success("task added");
    },
    onError: (error) => {
      toast.error(error.response.data.msg);
    }
  });

  return { createTask, isLoading };
};
