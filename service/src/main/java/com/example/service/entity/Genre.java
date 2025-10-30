package com.example.service.entity;

public enum Genre {
   HORROR("horror"),
   ACCION("acción"),
   COMEDIA("comedia"),
   FANTASIA("fantasía"),
   DRAMA("drama"),
   CIENCIA_FICCION("ciencia ficción"),
   AVENTURA("aventura"),
   MISTERIO("misterio");

   private final String displayName;

   Genre(String displayName) {
      this.displayName = displayName;
   }

   public String getDisplayName() {
      return displayName;
   }

   public static Genre fromDisplayName(String name) {
      for (Genre g : Genre.values()) {
         if (g.displayName.equalsIgnoreCase(name)) {
            return g;
         }
      }
      throw new IllegalArgumentException("No existe el género.");
   }

   @Override
   public String toString() {
      return displayName;
   }
}
