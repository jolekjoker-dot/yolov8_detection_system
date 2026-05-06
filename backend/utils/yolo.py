import sys
from ultralytics import YOLO
import cv2
import uuid
import os

def main():
    if len(sys.argv) < 2:
        print("请传入图片路径")
        return
    
    image_path = sys.argv[1]
    
    # 动态获取模型路径
    current_dir = os.path.dirname(os.path.abspath(__file__))
    model_path = os.path.join(current_dir, '../../yolo-model/best.pt')
    model = YOLO(os.path.abspath(model_path))

    results = model(image_path)
    
    result_path = f"public/results/{uuid.uuid4()}.jpg"
    os.makedirs(os.path.dirname(result_path), exist_ok=True)
    
    for result in results:
        annotated_frame = result.plot()
        cv2.imwrite(result_path, annotated_frame)
    
    print(result_path)  # 输出结果图路径，供 Node.js 接收

if __name__ == "__main__":
    main()