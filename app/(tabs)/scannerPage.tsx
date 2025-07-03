
import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Modal, Image, Alert, Platform } from 'react-native';
import { Camera, CameraType, useCameraPermissions } from 'expo-camera';

export default function ScannerPage() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [cameraType, setCameraType] = useState<CameraType>('back');
  const cameraRef = useRef();

  // Request Camera Permissions
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleCapture = async () => {
    if (cameraRef.current) {
      try {
        const options = { quality: 0.5, base64: true, skipProcessing: true };
        const photo = await cameraRef.current.takePictureAsync(options);
        setCapturedImage(photo.uri);
        setIsModalVisible(true);
      } catch (error) {
        console.error("Error capturing photo:", error);
        Alert.alert("Error", "Failed to capture image.");
      }
    } else {
      Alert.alert("Error", "Camera is not ready yet.");
    }
  };
  

// Handle Camera Flip
const toggleCameraType = () => {
  setCameraType((prevType: CameraType) =>
    prevType === 'back' ? 'front' : 'back'
  );
};


  // Web Compatibility Check
  if (Platform.OS === 'web') {
    return (
      <View style={styles.container}>
        <Text>Camera is not supported on web.</Text>
      </View>
    );
  }

  if (hasPermission === null) {
    return <View style={styles.container}><Text>Requesting camera permission...</Text></View>;
  }
  if (hasPermission === false) {
    return <View style={styles.container}><Text>No access to camera</Text></View>;
  }

  return (
    <View style={styles.container}>
      <Camera
        ref={cameraRef}
        style={styles.camera}
        type={cameraType}
      /> 

      {/* Capture Button */}
      <TouchableOpacity style={styles.captureButton} onPress={handleCapture}>
        <Text style={styles.buttonText}>📸 Scan</Text>
      </TouchableOpacity>

      {/* Toggle Camera Button */}
      <TouchableOpacity style={styles.toggleButton} onPress={toggleCameraType}>
        <Text style={styles.buttonText}>🔄 Flip Camera</Text>
      </TouchableOpacity>

      {/* Modal for Captured Image */}
      <Modal visible={isModalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          {capturedImage && <Image source={{ uri: capturedImage }} style={styles.previewImage} />}
          <TouchableOpacity style={styles.closeButton} onPress={() => setIsModalVisible(false)}>
            <Text style={styles.buttonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000' },
  camera: { width: '100%', height: '70%' },
  captureButton: { backgroundColor: '#007AFF', padding: 12, borderRadius: 10, marginTop: 20 },
  toggleButton: { backgroundColor: '#FF9500', padding: 12, borderRadius: 10, marginTop: 10 },
  buttonText: { color: '#fff', fontSize: 16 },
  modalContainer: { flex: 1, backgroundColor: 'rgba(0,0,0,0.8)', justifyContent: 'center', alignItems: 'center' },
  previewImage: { width: 300, height: 400, marginBottom: 20 },
  closeButton: { backgroundColor: '#FF3B30', padding: 10, borderRadius: 10 },
});