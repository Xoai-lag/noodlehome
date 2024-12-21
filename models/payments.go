package models

import "time"

type Payments struct {
	Payment_id     string    `json:"payment_id"`
	Oder_id        string    `json:"oder_id"`
	Payment_date   time.Time `json:"payment_date"`
	Payment_amount string    `json:"payment_amount"`
	Payment_method string    `json:"payment_method"`
}
