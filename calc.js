const BAG_WEIGHT_LB = { "12oz": 0.85, "2lb": 2.3 };
const ZONE_BASE = [0, 5.2, 5.6, 6.1, 6.8, 7.6, 8.4, 9.3, 10.2];
const PER_LB = 0.9;

function estimate(items, zone) {
  const weight = items.reduce((sum, { size, qty }) => sum + BAG_WEIGHT_LB[size] * qty, 0);
  const cost = ZONE_BASE[zone] + Math.max(0, Math.ceil(weight) - 1) * PER_LB;
  return { weight: Number(weight.toFixed(2)), cost: Number(cost.toFixed(2)) };
}

if (require.main === module) {
  const args = process.argv.slice(2);
  const zone = Number(args.pop().replace("zone", ""));
  const items = args.map((a) => {
    const [qty, size] = a.split("x");
    return { qty: Number(qty), size };
  });
  console.log(estimate(items, zone));
}

module.exports = { estimate };
