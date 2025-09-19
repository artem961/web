package lab1.fcgi.tools.http;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class QueryParamsParser {
    public static Map<String, String> parseQueryParams(String queryString) {
        List<String> params = List.of(queryString.split("&"));
        Map<String, String> result = new HashMap<>();

        try {
            params.forEach(param -> {
                String[] split = param.split("=");
                result.put(split[0], split[1]);
            });
            return result;
        } catch (IndexOutOfBoundsException e) {
            throw new ServerException(StatusCode.BAD_REQUEST, "Invalid query string");
        }
    }
}
