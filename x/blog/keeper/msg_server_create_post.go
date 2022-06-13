package keeper

import (
	"context"
	"encoding/json"
	"io/ioutil"
	"log"
	"net/http"

	"time"

	"github.com/cosmonaut/blog/x/blog/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	//"github.com/golang/protobuf/ptypes/timestamp"
)

type data struct {
	Success string `json:"success"`

	Records records `json:"records"`
}

type records struct {
	DatasetDescription string     `json:"datasetDescription"`
	Location           []location `json:"location"`
}

type location struct {
	LocationName   string           `json:"locationName"`
	WeatherElement []weatherElement `json:"weatherElement"`
}

type weatherElement struct {
	Time []Time `json:"time"`
}

type Time struct {
	StartTime string    `json:"startTime"`
	EndTime   string    `json:"endTime"`
	Parameter parameter `json:"parameter"`
}

type parameter struct {
	ParameterName  string `json:"parameterName"`
	ParameterValue string `json:"parameterValue"`
}

func (k msgServer) CreatePost(goCtx context.Context, msg *types.MsgCreatePost) (*types.MsgCreatePostResponse, error) {
	loc, _ := time.LoadLocation("Asia/Taipei")
	t := time.Now()
	localTime := t.In(loc).Format("2006-01-02 15:04:05")

	//hr := t.hour().String()
	ctx := sdk.UnwrapSDKContext(goCtx)
	// Create variable of type Post
	url := "https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWB-46B57297-3757-42F4-933B-F63D950668C3&format=JSON&locationName=%E8%87%BA%E5%8C%97%E5%B8%82&elementName=Wx&sort=time"
	resp, getErr := http.Get(url)
	if getErr != nil {
		log.Fatal(getErr)
	}
	body, readErr := ioutil.ReadAll(resp.Body)
	if readErr != nil {
		log.Fatal(readErr)
	}
	//a := string(body)

	data_obj := data{}
	jsonErr := json.Unmarshal(body, &data_obj)
	if jsonErr != nil {
		log.Fatal(jsonErr)
	}

	a := data_obj.Records.Location[0].WeatherElement[0].Time[1].Parameter.ParameterName
	//i := 1
	/*if t.Hour() < 18 {
		i :=0
	} */

	//fmt.Println(key)
	//fmt.Println("symbol", value["location"]+value["locationName"], "weather", value["parameterName"])
	//a :="location", value["locationName"]

	//c := a.Time[i].Parameter.ParameterName
	//c := a.Time[i].Parameter.ParameterValue
	var post = types.Post{
		Creator: msg.Creator,
		Title:   msg.Title,
		Body:    msg.Body,
		Weather: a + " " + localTime,
	}

	// Add a post to the store and get back the ID
	id := k.AppendPost(ctx, post)
	// Return the ID of the post
	return &types.MsgCreatePostResponse{Id: id}, nil
}
