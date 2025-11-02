package com.example.service.entity;

public enum Genre {
   HORROR("Horror"),
   ACCION("Acción"),
   COMEDIA("Comedia"),
   FANTASIA("Fantasía"),
   DRAMA("Drama"),
   CIENCIA_FICCION("Ciencia ficción"),
   AVENTURA("Aventura"),
   MISTERIO("Misterio");

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
