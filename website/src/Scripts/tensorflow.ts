import * as automl from "@tensorflow/tfjs-automl";
import { AnimalKeysCertian } from "../@Types/types";

let model: automl.ObjectDetectionModel | null = null;

const initializeTensorFlowModel = async () => {
  model = await automl.loadObjectDetection(
    window.location.href + "/assets/tensorflow/model.json"
  );
};

initializeTensorFlowModel();

export const findAnimals = async () => {
  if (model) {
    const results = await model.detect(
      document.getElementById("automlImage") as HTMLImageElement
    );
    console.log(results);
    let maxIndex = 0;
    for (let i = 0; i < results.length; i++) {
      if (results[i].score > results[maxIndex].score) {
        maxIndex = i;
      }
    }
    return results[maxIndex].label as AnimalKeysCertian;
  } else {
    return undefined;
  }
};
