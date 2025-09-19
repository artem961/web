package lab1.fcgi.tools.json;

import com.google.gson.Gson;

public record StandartCalcResult(Double x,
                                 Double y,
                                 Double r,
                                 boolean result,
                                 String time,
                                 String currentTime){
    public String toJson(){
        Gson gson = new Gson();
        return gson.toJson(this);
    }
}
