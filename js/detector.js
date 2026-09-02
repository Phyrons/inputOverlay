class DetectorPerfil{


    detectar(gamepad){


        const id =
        gamepad.id.toLowerCase();



        // Xbox

        if(
            id.includes("xbox") ||
            id.includes("xinput")
        ){

            return "xbox";

        }


        // SN30 Pro en modo Start + A (macOS / Wireless Controller).
        if(
            id.includes("wireless controller") &&
            id.includes("vendor: 054c product: 05c4")
        ){

            return "wireless";

        }


        // Playstation

        if(
            id.includes("dualshock") ||
            id.includes("dualsense") ||
            id.includes("wireless controller") ||
            id.includes("sony")
        ){

            return "ps5";

        }



        // 8BitDo: perfil independiente para permitir SVG y mapeos propios.

        if(
            id.includes("8bitdo")
        ){

            return "ebitdo";

        }



        // Nintendo

        if(
            id.includes("nintendo") ||
            id.includes("switch")
        ){

            return "switch";

        }



        return "generic";

    }


}
