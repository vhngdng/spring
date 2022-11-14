package vn.techmaster.firstweb.request;

import lombok.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class UpsertBookRequest {
    private String title;
    private String description;
    private int publishYear;
}
