import pkg from "mongoose";

const { connect, connection } = pkg;

export const checkConnection = () => {
  try {
    const url = "mongodb+srv://admin:admin123@cluster0.c9skhbf.mongodb.net/?retryWrites=true&w=majority";

    connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    connection.on("error", (err) => {
      console.error("Error in connecting Mongodb");
    });

    connection.once("open", () => {
      console.log("Mongodb connected successfully");
    });
  } catch (err) {
    return err;
  }
};
