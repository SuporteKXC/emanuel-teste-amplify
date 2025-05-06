import { useFullScreenHandle } from "react-full-screen";
import { ExportLayout } from "../layout";

const Dashboard = () => {
  const handle = useFullScreenHandle();
  return (
    <ExportLayout>
      <div className="w-full h-screen">
        <iframe
          className="w-full h-screen rounded-md"
          frameBorder="0"
          src="https://analytics.zoho.com/open-view/1432280000181975822/b86bc2883e11935e160043ffd8fe3b99"
        ></iframe>
      </div>
    </ExportLayout>
  );
};

export default Dashboard;
