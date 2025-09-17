package lab1.fcgi.tools;

import lab1.fcgi.tools.http.QueryParamsParser;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.Assertions;

import java.util.HashMap;
import java.util.Map;

public class QueryParamsParserTest {
    @Test
    void simpleQueryStringTest(){
        String queryString = "test1=value1&test2=value2&test3=value3";
        Map<String,String> expected = new HashMap<>();
        expected.put("test1", "value1");
        expected.put("test2", "value2");
        expected.put("test3", "value3");

        Assertions.assertEquals(expected,QueryParamsParser.parseQueryParams(queryString));
    }
}
