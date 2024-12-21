package models

import (
	"fmt"
	"noodlehome/utils"
	"time"
)

type Oders struct {
	Oder_id          string    `json:"oder_id"`
	User_id          string    `json:"user_id"`
	Oder_date        time.Time `json:"oder_date"`
	Oder_status      string    `json:"oder_status"`
	Oder_Total_Price string    `json:"oder_Total_Price"`
}

func LoadOrdersFromJson(Filename string, order *[]Oders) error {
	err := utils.LoadDataFromJson(Filename, &order)
	if err != nil {
		return fmt.Errorf("Error loading order from file %s: %v", Filename, err)
	}
	return nil
}

func SaveOrdersToJson(Filename string, order []Oders) error {
	err := utils.SaveDataToJson(Filename, order)
	if err != nil {
		return fmt.Errorf("Error saving order to file %s: %v", Filename, err)
	}
	return nil
}
