import { TableSectionProps } from '@/types/sheetDropZoneTypes';
import styles from '@/components/SheetUploadDropZone.module.css';
import LoadMoreButton from '@/components/LoadMoreButton';
import increaseOffset from '@/utilities/increaseOffset';

export default function TableSection(props: TableSectionProps) {
  const {
    workbook,
    tableContent,
    loadmoreCursor,
    setTableContent,
    setLoadmoreCursor,
  } = props;
  return (
    tableContent.length > 0 && (
      <section className={styles['table-section']}>
        <table className={styles.table}>
          <tr>
            {
              // Renders the table header
              workbook[0].rows[0].map((head) => (
                <th key={head} className={styles.th}>
                  {head}
                </th>
              ))
            }
          </tr>
          {
            // Renders the table body
            tableContent.map((element) => {
              const newElement = element;
              return (
                <tr key={element[0]}>
                  {newElement.map((element) => (
                    <td key={element} className={styles.td}>
                      {element}
                    </td>
                  ))}
                </tr>
              );
            })
          }
        </table>
        {!loadmoreCursor.endOfFile && (
          <LoadMoreButton
            {...{
              setTableContent,
              workbook,
              tableContent,
              loadmoreCursor,
              increaseOffset: () =>
                increaseOffset(loadmoreCursor, setLoadmoreCursor, workbook),
            }}
          />
        )}
      </section>
    )
  );
}
