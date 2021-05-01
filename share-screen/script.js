const videoElement = document.getElementById('video');
const btnElement = document.getElementById('button');

const selectMediaStream = async () => {
  try {
    const mediaStream = await navigator.mediaDevices.getDisplayMedia();

    videoElement.srcObject = mediaStream;
    videoElement.onloadedmetadata = () => {
      videoElement.play();
    };
  } catch (error) {
    console.log(error);
  }
};

btnElement.addEventListener('click', async () => {
  await videoElement.requestPictureInPicture();
});

selectMediaStream();
