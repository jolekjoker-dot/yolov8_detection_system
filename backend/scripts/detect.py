import sys
import os
from model import YOLO
import cv2

def main():
    # 从命令行获取参数：输入图片路径、输出图片路径
    input_path = sys.argv[1]
    output_path = sys.argv[2]

    # 动态获取当前脚本所在目录，拼接到预训练模型目录
    current_dir = os.path.dirname(os.path.abspath(__file__))
    model_path = os.path.join(current_dir, '../../yolo-model/best.pt')

    # 加载训练好的 YOLOv8 模型
    model = YOLO(os.path.abspath(model_path))  # 或自定义模型路径 './runs/train/exp/weights/best.pt'

    # 读取图片并进行识别
    image = cv2.imread(input_path)
    results = model(image)

    # 绘制识别框并保存结果图
    annotated_image = results[0].plot()  # 生成带框的图片
    cv2.imwrite(output_path, annotated_image)

    print(f"识别完成，结果保存至: {output_path}")

if __name__ == "__main__":
    main()