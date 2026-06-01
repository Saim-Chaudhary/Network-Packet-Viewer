import React from 'react';
import './App.css';
import packets from './data/packet';
import { useState, useMemo } from 'react';

const App = () => {

  const [search, setSearch] = useState('');
  const filteredData = useMemo(() => {
    return packets
      .filter((data) => {
        if (search === '') return true;

        return data.protocol.toLowerCase().includes(search.toLowerCase()) ||
          data.sourceIP.toLowerCase().includes(search.toLowerCase()) ||
          data.destinationIP.toLowerCase().includes(search.toLowerCase());
      })
  }, [search]);

  const totalPackets = useMemo(() => {
    return filteredData.length;
  }, [filteredData]);

  const successPackets = useMemo(() => {
    return filteredData.filter((data) => data.status === 'success').length;
  }, [filteredData]);

  const failedPackets = useMemo(() => {
    return filteredData.filter((data) => data.status === 'failed').length;
  }, [filteredData]);

  const protocolCounts = useMemo(() => {
    const counts = {
      TCP: 0,
      UDP: 0,
      HTTP: 0,
      DNS: 0,
      ICMP: 0,
    };

    filteredData.forEach((data) => {
      const key = data.protocol.toUpperCase();
      if (counts[key] !== undefined) {
        counts[key] += 1;
      }
    });

    return counts;
  }, [filteredData]);

  const protocolMax = useMemo(() => {
    return Math.max(1, ...Object.values(protocolCounts));
  }, [protocolCounts]);

  return (
    <>
      <div className="app-shell">
        <div className="toolbar">
          <div className="toolbar-title">
            <p className="eyebrow">Traffic Monitor</p>
            <h1>Packet Activity</h1>
          </div>
          <input
            className="search-input"
            type="search"
            placeholder='Search by Protocol, Source or Destination IP'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="summary">
          <div>
            <p className="eyebrow">Total Packets</p>
            <h2>{totalPackets}</h2>
          </div>
          <div>
            <p className="eyebrow">Success Transfer</p>
            <h2>{successPackets}</h2>
          </div>
          <div>
            <p className="eyebrow">Failed Transfer</p>
            <h2>{failedPackets}</h2>
          </div>
        </div>
        <div className="protocol-grid">
          {Object.entries(protocolCounts).map(([protocol, count]) => (
            <div className="protocol-card" key={protocol}>
              <div className="protocol-meta">
                <p className="protocol-name">{protocol}</p>
                <p className="protocol-count">{count}</p>
              </div>
              <div className="protocol-bar">
                <div
                  className="protocol-fill"
                  style={{ width: `${(count / protocolMax) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
        <table className="packet-table">
          <thead>
            <tr>
              <th>Source</th>
              <th>Destination</th>
              <th>Protocol</th>
              <th>Size</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {
              filteredData.map((data) => (
              <tr key={data.id}>
                <td>{data.sourceIP}</td>
                <td>{data.destinationIP}</td>
                <td>{data.protocol}</td>
                <td>{data.size}</td>
                <td>{data.status}</td>
              </tr>
            ))
            }
          </tbody>
        </table>
      </div>
    </>
  )
}

export default App
