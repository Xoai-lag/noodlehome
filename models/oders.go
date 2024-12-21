package models

import "time"

type Oders struct {
	Oder_id          string    `json:"oder_id"`
	User_id          string    `json:"user_id"`
	Oder_date        time.Time `json:"oder_date"`
	Oder_status      string    `json:"oder_status"`
	Oder_Total_Price string    `json:"oder_Total_Price"`
}
