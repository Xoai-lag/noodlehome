package models

import (
	"fmt"
	"noodlehome/utils"
)

type Items struct {
	Item_id       string `json:"item_id"`
	Oder_id       string `json:"oder_id"`
	Product_id    string `json:"product_id"`
	Item_quantity string `json:"item_quantity"`
	Item_price    string `json:"item_price"`
}

func LoadOrders_ItemFromJson(Filename string, It *[]Items) error {
	err := utils.LoadDataFromJson(Filename, &It)
	if err != nil {
		return fmt.Errorf("Error loading order item from file %s: %v", Filename, err)
	}
	return nil
}

func SaveOrders_ItemToJson(Filename string, It []Items) error {
	err := utils.SaveDataToJson(Filename, It)
	if err != nil {
		return fmt.Errorf("Error saving order item to file %s: %v", Filename, err)
	}
	return nil
}
