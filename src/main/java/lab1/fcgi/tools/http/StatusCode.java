package lab1.fcgi.tools.http;

import lombok.Getter;

@Getter
public enum StatusCode {
    OK(200),
    BAD_REQUEST(400),
    NOT_FOUND(404);

    private final int statusCode;
    StatusCode(int statusCode){
        this.statusCode = statusCode;
    }

    @Override
    public String toString() {
        return this.name();
    }

}
