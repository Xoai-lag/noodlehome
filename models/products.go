package models

import (
	"fmt"
	"noodlehome/utils"
)

type Products struct {
	Product_id     string `json:"product_id"`
	Product_name   string `json:"product_name"`
	Product_stock  string `json:"products_stock"`
	Products_price string `json:"products_price"`
}

func GetProducts(filename string, product *[]Products) error {
	if err := utils.LoadDataFromJson(filename, &product); err != nil {
		return fmt.Errorf("Errorf get products from file %s %v", filename, err)
	}
	return nil
}
func SaveProducts(filename string, product []Products) error {
	if err := utils.SaveDataToJson(filename, product); err != nil {
		return fmt.Errorf("Error save products to file %s %v", filename, err)
	}
	return nil
}
