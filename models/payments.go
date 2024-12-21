package models

import (
	"fmt"
	"noodlehome/utils"
	"time"
)

type Payments struct {
	Payment_id     string    `json:"payment_id"`
	Oder_id        string    `json:"oder_id"`
	Payment_date   time.Time `json:"payment_date"`
	Payment_amount string    `json:"payment_amount"`
	Payment_method string    `json:"payment_method"`
}

func LoadPaymentFormJson(Filename string, pay *[]Payments) error {
	err := utils.LoadDataFromJson(Filename, &pay)
	if err != nil {
		return fmt.Errorf("Error loading payment from file %s: %v", Filename, err)
	}
	return nil
}

func SavePaymentToJson(Filename string, pay []Payments) error {
	err := utils.SaveDataToJson(Filename, pay)
	if err != nil {
		return fmt.Errorf("Error saving payment to file %s: %v", Filename, err)
	}
	return nil
}
