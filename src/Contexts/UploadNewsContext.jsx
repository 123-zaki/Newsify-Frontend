import { createContext, useState } from "react";

export const UploadNewsContext = createContext();

export function UploadNewsProvider({children}) {
    const [isUploadNewsOpen, setIsUploadNewsOpen] = useState(false);

    return <UploadNewsContext.Provider value={{isUploadNewsOpen, setIsUploadNewsOpen}}>
        {children}
    </UploadNewsContext.Provider>
};