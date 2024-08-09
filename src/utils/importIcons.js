const requireContext = require.context('../assets/img/icons', false, /\.(png|jpe?g|svg)$/);

const icons = requireContext.keys().map(requireContext);

export default icons;