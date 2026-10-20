 
import ReduxProvider from "@/redux/Provider";
import "./globals.css";
import ConditionalNavbar from "@/components/ConditionalNavbar";
import ConditionalFooter from "@/components/CondtionalFooter";
 
export default function RootLayout({
    children,
}:Readonly<{
    children:React.ReactNode;
}>){
  return(
    <html lang="en">
      <body>
        <ReduxProvider>
          <ConditionalNavbar/>
          {children}
          <ConditionalFooter/>
        </ReduxProvider>
      </body>
    </html>
  );
}
