package models

import (
	"fmt"
	"noodlehome/utils"
)

type Users struct {
	Id_u        string `json:"id_u"`
	Full_name_u string `json:"full_name_u"`
	Password_u  string `json:"password_u"`
	Email_u     string `json:"email_u"`
}

func LoadUsersFromJson(Filename string, users *[]Users) error {
	err := utils.LoadDataFromJson(Filename, &users)
	if err != nil {
		return fmt.Errorf("Error loading users from file %s: %v", Filename, err)
	}
	return nil
}

func SaveUsersToJson(Filename string, users []Users) error {
	err := utils.SaveDataToJson(Filename, users)
	if err != nil {
		return fmt.Errorf("Error saving users to file %s: %v", Filename, err)
	}
	return nil
}
