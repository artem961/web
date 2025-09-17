package lab1.fcgi.tools.json;

import com.google.gson.Gson;

public record StandartCalcResult(boolean result,
                                 String processTime,
                                 String currentTime){
    public String toJson(){
        Gson gson = new Gson();
        return gson.toJson(this);
    }
}
