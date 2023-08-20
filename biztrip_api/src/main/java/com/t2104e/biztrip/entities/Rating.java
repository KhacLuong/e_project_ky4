package com.t2104e.biztrip.entities;

public enum Rating {
    OneStar(1),
    TwoStar(2),
    ThreeStar(3),
    FourStar(4),
    FiveStar(5);

    private final int rating;

    Rating(int rating) {
        this.rating = rating;
    }

    public int getRatingAsInt() {
        return rating;
    }

    public String getRatingAsString() {
        return String.valueOf(rating);
    }

    public static Rating convertIntToRating(int iRating) {
        for (Rating rating : Rating.values()) {
            if (rating.getRatingAsInt() == iRating) {
                return rating;
            }
        }
        return null;
    }

    public static Rating convertStringToRating(String inputRating) {
        for (Rating rating : Rating.values()) {
            if (rating.getRatingAsString().equals(inputRating)) {
                return rating;
            }
        }
        return null;
    }

    public static int convertRatingToInt(Rating inputRating) {
        for (Rating rating : Rating.values()) {
            if (rating.getRatingAsInt() == inputRating.getRatingAsInt()) {
                return rating.getRatingAsInt();
            }
        }
        return -1;
    }

    public static String convertRatingToString(Rating inputRating) {
        for (Rating rating : Rating.values()) {
            if (rating.getRatingAsInt() == inputRating.getRatingAsInt()) {
                return rating.getRatingAsString();
            }
        }
        return null;
    }
}
