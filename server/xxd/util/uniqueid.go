/**
 * The log file of util current module of xxd.
 *
 * @copyright   Copyright 2009-2017 青岛易软天创网络科技有限公司(QingDao Nature Easy Soft Network Technology Co,LTD, www.cnezsoft.com)
 * @license     ZPL (http://zpl.pub/page/zplv12.html)
 * @author      Memory <lvtoa@cnezsoft.com>
 * @package     util
 * @link        http://www.zentao.net
 */
package util

import (
	"io/ioutil"
	"os"
)

func CreatUid(serverName string, userID int64, key string) error {

	url := Config.LogPath + "/" + serverName + "/"

	if err := Mkdir(url); err != nil {
		LogError().Println("mkdir error %s\n", err)
		return err
	}

	fileName := url + Int642String(userID)

	fout, err := os.Create(fileName)
	defer fout.Close()
	if err != nil {
		LogError().Println("Create file error", fileName, err)
		return err
	}

	fout.WriteString(key)

	return nil
}

func GetUid(serverName string, userID string) (string, error) {
	url := Config.LogPath + "/" + serverName + "/" + userID

	file, err := os.Open(url)
	if err != nil {
		LogError().Println(err)
		return "", err
	}
	data, err := ioutil.ReadAll(file)
	if err != nil {
		LogError().Println(err)
		return "", err
	}
	return string(data), err
}

func DelUid(serverName string, userID string) error {
	url := Config.LogPath + "/" + serverName + "/" + userID
	err := Rm(url)
	if err != nil {
		return err
	}
	return nil
}
