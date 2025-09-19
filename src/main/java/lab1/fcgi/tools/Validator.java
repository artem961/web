package lab1.fcgi.tools;

import lab1.fcgi.tools.http.ServerException;
import lab1.fcgi.tools.http.StatusCode;

public class Validator {
    public static boolean checkHit(Double x, Double y, Double r) {
        if (x >= 0 && y >= 0 && x <= r && y <= r / 2) { //Прямоугольник
            return true;
        } else if (x >= 0 && y <= 0 && (x * x + y * y <= r * r)) { // Сектор
            return true;
        } else if (x <= 0 && y <= 0 && (y >= -2 * x - r)) { // Треугольник
            return true;
        } else {
            return false;
        }
    }

    public static boolean checkRange(Double value, Double min, Double max) {
        return value >= min && value <= max;
    }

    public static Double parseNumber(String number) {
        try {
            return Double.parseDouble(number);
        } catch (NumberFormatException e) {
            throw new ServerException(StatusCode.BAD_REQUEST, "Значение " + number + " не является числом!");
        } catch (NullPointerException e){
            throw new ServerException(StatusCode.BAD_REQUEST, "Ожидались параметры x, y, r");
        }
    }
}
