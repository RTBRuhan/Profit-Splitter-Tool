import { useState } from "react";
import { Slider, Container, Card, Typography, Grid, TextField, Checkbox, FormControlLabel } from "@mui/material";

export default function InvestmentTool() {
  const [totalInvestment, setTotalInvestment] = useState(10000);
  const [showActualAmount, setShowActualAmount] = useState(false);
  const [enableRoundMode, setEnableRoundMode] = useState(false); // Round Mode State
  const [investors, setInvestors] = useState([
    { id: 1, name: "Investor 1", workload: 50.0, payload: 50.0, profit: 50.0 },
    { id: 2, name: "Investor 2", workload: 50.0, payload: 50.0, profit: 50.0 },
  ]);

  // Update investor and balance workload/payload
  const updateInvestor = (id, field, value) => {
    let newInvestors = [...investors];
    const investorIndex = newInvestors.findIndex((inv) => inv.id === id);

    // Update the selected field for the current investor
    newInvestors[investorIndex][field] = value;

    // Rebalance the remaining investors' field values
    const totalFieldValue = newInvestors.reduce((sum, inv) => sum + inv[field], 0);

    if (totalFieldValue !== 100) {
      const remainingValue = 100 - value;
      const otherInvestors = newInvestors.filter((_, index) => index !== investorIndex);
      const totalOtherValues = otherInvestors.reduce((sum, inv) => sum + inv[field], 0);

      newInvestors = newInvestors.map((inv, index) => {
        if (index !== investorIndex) {
          const proportion = totalOtherValues > 0 ? inv[field] / totalOtherValues : 1 / otherInvestors.length;
          return { ...inv, [field]: parseFloat((proportion * remainingValue).toFixed(2)) };
        }
        return inv;
      });
    }

    // Ensure payload percentages sum to exactly 100%
    const totalPayload = newInvestors.reduce((sum, inv) => sum + inv.payload, 0);
    if (totalPayload !== 100) {
      const adjustmentFactor = 100 / totalPayload;
      newInvestors = newInvestors.map((inv) => ({
        ...inv,
        payload: parseFloat((inv.payload * adjustmentFactor).toFixed(2)),
      }));
    }

    // Recalculate profits based on proportional workload and payload
    const totalWorkload = newInvestors.reduce((sum, inv) => sum + inv.workload, 0);

    newInvestors = newInvestors.map((inv) => ({
      ...inv,
      profit: parseFloat((((inv.workload / totalWorkload) + (inv.payload / totalPayload)) * 50).toFixed(2)),
    }));

    setInvestors(newInvestors);
  };

  const handleInvestorCountChange = (count) => {
    const currentCount = investors.length;
    if (count < 1) return;

    if (count > currentCount) {
      const newInvestors = [];
      for (let i = currentCount + 1; i <= count; i++) {
        newInvestors.push({
          id: Date.now() + i,
          name: `Investor ${i}`,
          workload: parseFloat((100 / count).toFixed(2)),
          payload: parseFloat((100 / count).toFixed(2)),
          profit: parseFloat((100 / count).toFixed(2)),
        });
      }
      const updatedInvestors = [...investors, ...newInvestors].map((inv) => ({
        ...inv,
        workload: parseFloat((100 / count).toFixed(2)),
        payload: parseFloat((100 / count).toFixed(2)),
        profit: parseFloat((100 / count).toFixed(2)),
      }));
      setInvestors(updatedInvestors);
    } else if (count < currentCount) {
      const updatedInvestors = investors.slice(0, count).map((inv) => ({
        ...inv,
        workload: parseFloat((100 / count).toFixed(2)),
        payload: parseFloat((100 / count).toFixed(2)),
        profit: parseFloat((100 / count).toFixed(2)),
      }));
      setInvestors(updatedInvestors);
    }
  };

  return (
    <Container
      maxWidth="md"
      style={{
        padding: "40px",
        backgroundColor: "#eaedef",
        borderRadius: "10px",
        boxShadow: "0px 4px 10px rgba(0,0,0,.1)",
        marginTop: "5vh",
      }}
    >
      <Card style={{ padding: "20px", marginBottom: "20px", backgroundColor: "#ffffff", boxShadow: "0px 0px 1px rgba(0,0,.1)" }}> 
        <Typography variant="h5" gutterBottom>Total Investment & Investors</Typography>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={6}>
            <TextField
              label="Total Investment (tk)"
              type="number"
              value={totalInvestment}
              onChange={(e) => setTotalInvestment(Number(e.target.value))}
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Total Investors"
              type="number"
              value={investors.length}
              onChange={(e) => handleInvestorCountChange(Number(e.target.value))}
              fullWidth
              variant="outlined"
            />
          </Grid>
        </Grid>
        <FormControlLabel
          control={<Checkbox checked={showActualAmount} onChange={() => setShowActualAmount(!showActualAmount)} />}
          label="Show Actual Amount for Payload"
        />
        <FormControlLabel
          control={<Checkbox checked={enableRoundMode} onChange={() => setEnableRoundMode(!enableRoundMode)} />}
          label="Enable Round Mode"
        />
      </Card>
      {investors.map((inv) => (
        <Card key={inv.id} style={{ padding: "20px", marginBottom: "10px", backgroundColor: "#ffffff", boxShadow: "0px .rgba(.1)" }}>
          <Typography 
            variant="h6" 
            onDoubleClick={() => {
              const newName = prompt("Enter new investor name:", inv.name);
              if (newName && newName.trim()) {
                let updatedInvestors = [...investors];
                updatedInvestors.find((i) => i.id === inv.id).name = newName.trim();
                setInvestors(updatedInvestors);
              }
            }}
            style={{ cursor: "pointer" }}
          >
            {inv.name}
          </Typography>
          <div>
            <Typography 
              gutterBottom 
              onDoubleClick={() => {
                const newValue = prompt("Enter Work Load (%):", `${parseFloat(inv.workload).toFixed(2)}%`);
                if (newValue && !isNaN(parseFloat(newValue))) {
                  updateInvestor(inv.id, "workload", parseFloat(newValue));
                }
              }}
              style={{ cursor: "pointer" }}
            >
              Work Load: {enableRoundMode ? Math.round(inv.workload) + "%" : parseFloat(inv.workload).toFixed(2) + "%"}
            </Typography>
            <Slider
              value={inv.workload}
              onChange={(_, value) => updateInvestor(inv.id, "workload", value)}
              min={0}
              max={100}
            />
          </div>
          <div>
            <Typography 
              gutterBottom 
              onDoubleClick={() => {
                const inputLabel = showActualAmount ? "Enter Pay Load (tk):" : "Enter Pay Load (%):";
                const currentValue = showActualAmount
                  ? ((totalInvestment * inv.payload) / 100).toFixed(2)
                  : `${parseFloat(inv.payload).toFixed(2)}%`;
                const newValue = prompt(inputLabel, currentValue);
                if (newValue && !isNaN(parseFloat(newValue))) {
                  const adjustedValue = showActualAmount
                    ? (parseFloat(newValue) / totalInvestment) * 100
                    : parseFloat(newValue);
                  updateInvestor(inv.id, "payload", adjustedValue);
                }
              }}
              style={{ cursor: "pointer" }}
            >
              Pay Load: {showActualAmount 
                ? enableRoundMode 
                  ? Math.round(totalInvestment * inv.payload / 100) + " tk" 
                  : ((totalInvestment * inv.payload) / 100).toFixed(2) + " tk"
                : enableRoundMode 
                  ? Math.round(inv.payload) + "%" 
                  : parseFloat(inv.payload).toFixed(2) + "%"}
            </Typography>
            <Slider
              value={inv.payload}
              onChange={(_, value) => updateInvestor(inv.id, "payload", value)}
              min={0}
              max={100}
            />
          </div>
          <div>
            <Typography gutterBottom>Profit Share: {parseFloat(inv.profit).toFixed(2)}%</Typography>
            <Slider
              value={inv.profit}
              disabled // Profit is auto-calculated based on workload & payload
              min={0}
              max={100}
            />
          </div>
        </Card>
      ))}
    </Container>
  );
}
