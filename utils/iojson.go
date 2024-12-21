package utils

import (
	"encoding/json"
	"fmt"
	"os"
)

// load từ file json
func LoadDataFromJson(Filename string, Data interface{}) error {
	//mở file
	file, err := os.Open(Filename)
	if err != nil {
		return fmt.Errorf("Error opening file %s : %v", Filename, err)
	}
	//đóng file khi kết thúc hàm
	defer file.Close()
	//kiểm tra nếu tệp trống
	start, err := file.Stat()
	if err != nil {
		return fmt.Errorf("Error getting file info for %s: %v", Filename, err)
	}
	if start.Size() == 0 {
		return fmt.Errorf("File %s is empty", Filename)
	}
	//đọc tất cả nội dung trong file
	data, err := os.ReadFile(Filename)
	if err != nil {
		return fmt.Errorf("Error reading from %s: %v", Filename, err)
	}
	//giải mã nội dung vào struct Data
	err = json.Unmarshal(data, Data)
	if err != nil {
		return fmt.Errorf("Error parsing JSON from %s: %v", Filename, err)
	}
	return nil
}

// save vào json
func SaveDataToJson(Filename string, Data interface{}) error {
	//mở hoặc tạo file
	file, err := os.Create(Filename)
	if err != nil {
		return fmt.Errorf("Error opening file %s : %v", Filename, err)
	}
	//đóng file khi kết thúc hàm
	defer file.Close()
	//mã hóa struct Data
	data, err := json.MarshalIndent(Data, "", "  ")
	if err != nil {
		return fmt.Errorf("Error serializing data to JSON: %v", err)
	}
	//Ghi vào file
	_, err = file.Write(data)
	if err != nil {
		return fmt.Errorf("Error writing to %s: %v", Filename, err)
	}
	return nil
}
