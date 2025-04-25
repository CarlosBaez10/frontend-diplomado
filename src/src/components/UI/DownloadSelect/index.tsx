import { useContext, useEffect, useState } from "react";
import ExcelJS from "exceljs";
import { UIContext } from "src/context";
import useAxios from "src/hooks/useAxios";
import { RegistriesService, AttendanceService } from "src/services";
import downloadIcon from "src/assets/icon/download.svg";
import loadingIco from "src/assets/icon/loading.svg";
import styles from "./download.module.css";

type Props = {
  filter: string;
  type: string;
};

const attendanceHeader = [
  "ID",
  "Tarjeta",
  "Documento",
  "Usuario",
  "Teléfono",
  "Correo",
  "Acción",
  "Fecha",
  "Descripción",
];

const accessHeader = [
  "ID",
  "Tarjeta",
  "Documento",
  "Usuario",
  "Teléfono",
  "Correo",
  "Acción",
  "Piso",
  "Puerta",
  "Fecha",
  "Descripción",
];

const alertsHeaders = [
  "ID",
  "Número Dispositivo",
  "Código dispositivo",
  "Número de la tarjeta",
  "Código de la tarjeta",
  "Acción",
  "Fecha",
  "Descripción",
];

const DownloadSelect = ({ filter, type }: Props) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { toggleCheking } = useContext(UIContext);
  const { callEndpoint } = useAxios();

  useEffect(() => {
    setLoading(true);
    generateDataExcel();
    setLoading(false);
  }, [data]);

  const getDataToExcel = async (time: string) => {
    toggleCheking();
    const res =
      type === "attendance"
        ? await callEndpoint(AttendanceService.downloadAccess(filter, time))
        :
        type === "accesos"
          ? await callEndpoint(RegistriesService.downloadAccess(filter, time))
          : await callEndpoint(RegistriesService.downloadAlerts(filter, time));
    if (res) {
      const { data } = res.data;
      toggleCheking();
      setData(data);
    } else {
      toggleCheking();
      setData([]);
    }
  };

  const generateDataExcel = async () => {
    if (data.length === 0) return;
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet(`reporte_${type}`);
    worksheet.addRow(type === "attendance" ? attendanceHeader : type === "accesos" ? accessHeader : alertsHeaders);
    data.forEach((item, __) => {
      let row_temp: string[] = [];
      Object.values(item).forEach((value, _) => {
        row_temp.push(String(value));
      });
      worksheet.addRow(row_temp);
    });

    Array.from({ length: data.length }, (_, i) => i + 1).forEach((i: any) => {
      if (i == 1) {
        worksheet.getRow(i).font = {
          name: "Calibry",
          family: 4,
          size: 12,
          bold: true,
        };
        worksheet.getColumn(i).font = {
          name: "Calibry",
          family: 4,
          size: 12,
          bold: true,
        };
      }
      worksheet.getRow(i).eachCell((_, colNumber) => {
        const currentColumn = worksheet.getColumn(colNumber);
        currentColumn.width = 30;
        currentColumn.alignment = {
          horizontal: "center",
          vertical: "middle",
        };
      });
    });

    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `reporte_${type}.xlsx`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    });
  };

  return (
    <div className={styles.download_select}>
      <label htmlFor="download">
        <img src={loading ? loadingIco : downloadIcon} alt="Download icon" />{" "}
        Descargar
      </label>
      <input type="checkbox" id="download" />
      <ul>
        <li onClick={() => getDataToExcel("diary")}>Diario</li>
        <li onClick={() => getDataToExcel("weekly")}>Semanal</li>
        <li onClick={() => getDataToExcel("fortnightly")}>Quincenal</li>
        { type === "attendance" && (
          <li onClick={() => getDataToExcel("monthly")}>Mensual</li>
        )}
      </ul>
    </div>
  );
};

export default DownloadSelect;
