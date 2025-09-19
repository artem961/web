package lab1.fcgi;

import com.fastcgi.FCGIInterface;
import lab1.fcgi.tools.http.ServerException;
import lab1.fcgi.tools.json.StandartCalcResult;
import lab1.fcgi.tools.http.QueryParamsParser;
import lab1.fcgi.tools.http.StatusCode;

import java.time.LocalTime;
import java.util.Map;

import static lab1.fcgi.tools.Validator.*;
import static lab1.fcgi.tools.fcgi.ResponseSender.sendError;
import static lab1.fcgi.tools.fcgi.ResponseSender.sendJsonResponse;

public class Main {
    public static void main(String[] args) {

        while (new FCGIInterface().FCGIaccept() >= 0) {
            try {
                String method = FCGIInterface.request.params.getProperty("REQUEST_METHOD");

                if (method.equals("GET")) {
                    String queryString = FCGIInterface.request.params.getProperty("QUERY_STRING");
                    Map<String, String> queryParams = QueryParamsParser.parseQueryParams(queryString);
                    Double x = parseNumber(queryParams.get("x"));
                    Double y = parseNumber(queryParams.get("y"));
                    Double r = parseNumber(queryParams.get("r"));

                    if (!checkRange(r, 0d, Double.MAX_VALUE)) {
                        throw new ServerException(StatusCode.BAD_REQUEST, "Значение r должно быть больше или равно 0!");
                    }

                    Long startTime = System.nanoTime();
                    boolean result = checkHit(x, y, r);
                    Long endTime = System.nanoTime();


                    String jsonResult = new StandartCalcResult(
                            x,
                            y,
                            r,
                            result,
                            String.valueOf(endTime - startTime),
                            String.valueOf(LocalTime.now().withNano(0)))
                            .toJson();
                    sendJsonResponse(StatusCode.OK, jsonResult);
                }
            } catch (ServerException e) {
                sendError(e);
            } catch (Exception e) {
                sendError(new ServerException(StatusCode.INTERNAL_SERVER_ERROR, e.getMessage()));
            }
        }
    }
}
