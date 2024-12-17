import * as React from 'react';
import { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';  
import { Column } from 'primereact/column';
import { fetchArtworks } from '../services/api';

interface Artwork {
  id: number;
  title: string;
  place_of_origin: string;
  artist_display: string;
  inscriptions: string;
  date_start: number;
  date_end: number;
}

const ArtworkTable: React.FC = () => {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [loading, setLoading] = useState(false);
  const [selectedRowIds, setSelectedRowIds] = useState<Set<number>>(new Set());
  const [page, setPage] = useState(1);
  const onRowSelectionChange = (e: { value: Artwork[] }) => {
    const updatedSet = new Set(e.value.map((row) => row.id));
    setSelectedRowIds(updatedSet);  
  };

  const loadArtworks = async (page: number) => {
    setLoading(true);
    try {
      const data = await fetchArtworks(page);
      setArtworks(data.data.map((item: any) => ({
        id: item.id,
        title: item.title,
        place_of_origin: item.place_of_origin,
        artist_display: item.artist_display,
        inscriptions: item.inscriptions,
        date_start: item.date_start,
        date_end: item.date_end,
      })));
      setTotalRecords(data.pagination.total);
    } catch (error) {
      console.error('Error fetching artworks:', error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    loadArtworks(page);
  }, [page]);
  const onPageChange = (e: any) => {
    setPage(e.page + 1);  
  };

  return (
    <div className="card">
      <DataTable
        value={artworks}   
        paginator
        rows={10}
        totalRecords={totalRecords}
        lazy
        loading={loading}
        onPage={onPageChange}
        selectionMode="checkbox"
        selection={artworks.filter((artwork) => selectedRowIds.has(artwork.id))}
        onSelectionChange={onRowSelectionChange}  
        dataKey="id"
      >
        <Column selectionMode="multiple" headerStyle={{ width: '3em' }}></Column>
        <Column field="title" header="Title"></Column>
        <Column field="place_of_origin" header="Place of Origin"></Column>
        <Column field="artist_display" header="Artist"></Column>
        <Column field="inscriptions" header="Inscriptions"></Column>
        <Column field="date_start" header="Start Date"></Column>
        <Column field="date_end" header="End Date"></Column>
      </DataTable>
    </div>
  );
};

export default ArtworkTable;
