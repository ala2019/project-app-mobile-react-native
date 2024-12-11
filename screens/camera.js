import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import * as MediaLibrary from "expo-media-library";
import {
  CameraView,
  CameraType,
  useCameraPermissions,
  Camera,
} from "expo-camera";
const Profile = ({ afterSaveEmage, close }) => {
  const [hasCamPerm, sethasCamPerm] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(CameraView.defaultProps.facing);
  const [flash, setFlash] = useState(CameraView.defaultProps.flash);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      MediaLibrary.requestPermissionsAsync();
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      sethasCamPerm(cameraStatus.status === "granted");
    })();
  }, []);
  const flipCam = () => {
    setType(type === "back" ? "front" : "back");
  };
  const takeAPic = async () => {
    if (cameraRef) {
      try {
        const data = await cameraRef.current.takePictureAsync();
        console.log(data);
        setImage(data.uri);
      } catch (err) {
        console.log(err);
      }
    }
  };
  const savePic = async () => {
    if (image) {
      try {
        await MediaLibrary.createAssetAsync(image);
        setImage(image);
        afterSaveEmage(image);
      } catch (error) {
        console.log(err);
      }
    }
  };
  if (hasCamPerm === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      {!image ? (
        <CameraView style={styles.camera} facing={type} ref={cameraRef}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.flipButton]}
              onPress={flipCam}
            >
              <Text style={styles.text}>Caméra à bascule</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.takeButton]}
              onPress={takeAPic}
            >
              <Text style={styles.text}>Prenez une photo</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={close}
            >
              <Text style={styles.text}>Annuler</Text>
            </TouchableOpacity>
          </View>
        </CameraView>
      ) : (
        <Image style={styles.camera} source={{ uri: image }} />
      )}
      {image && (
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setImage(null);
            }}
          >
            <Text style={styles.text}>Nouveau</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => savePic()}>
            <Text style={styles.text}>Sauvegarde</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  camera: {
    flex: 1,
    justifyContent: "flex-end", // Place buttons at the bottom
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around", // Space out buttons evenly
    padding: 16,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
    zIndex: 999,
  },
  button: {
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    flex: 1, // Make buttons take equal space
    marginHorizontal: 8, // Add spacing between buttons
  },
  flipButton: {
    backgroundColor: "#4CAF50", // Green
  },
  takeButton: {
    backgroundColor: "#2196F3", // Blue
  },
  cancelButton: {
    backgroundColor: "#F44336", // Red
  },
  text: {
    color: "#FFF", // White text
    fontWeight: "bold",
    textAlign: "center",
  },
});
