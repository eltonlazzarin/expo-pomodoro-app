import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    color: "#1C354F",
    fontSize: 28,
    fontFamily: "Poppins-Regular",
    textAlign: "center",
    maxWidth: 300,
    marginBottom: 22,
  },

  buttons: {
    flexDirection: "row",
  },

  button: {
    width: 72,
    height: 72,
    backgroundColor: "#2E5B9A",
    borderRadius: 36,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 60,
    marginHorizontal: 30,
  },

  progress: {
    color: "#1C354F",
    fontSize: 45,
    fontFamily: "Poppins-Bold",
    textAlign: "center",
  },
});
