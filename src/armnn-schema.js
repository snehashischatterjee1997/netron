const $root = flatbuffers.get('armnn');

$root.armnnSerializer = $root.armnnSerializer || {};

$root.armnnSerializer.ActivationFunction = {
    Sigmoid: 0,
    TanH: 1,
    Linear: 2,
    ReLu: 3,
    BoundedReLu: 4,
    SoftReLu: 5,
    LeakyReLu: 6,
    Abs: 7,
    Sqrt: 8,
    Square: 9,
    Elu: 10,
    HardSwish: 11
};

$root.armnnSerializer.ArgMinMaxFunction = {
    Min: 0,
    Max: 1
};

$root.armnnSerializer.DataType = {
    Float16: 0,
    Float32: 1,
    QuantisedAsymm8: 2,
    Signed32: 3,
    Boolean: 4,
    QuantisedSymm16: 5,
    QAsymmU8: 6,
    QSymmS16: 7,
    QAsymmS8: 8,
    QSymmS8: 9
};

$root.armnnSerializer.DataLayout = {
    NHWC: 0,
    NCHW: 1
};

$root.armnnSerializer.ResizeMethod = {
    NearestNeighbor: 0,
    Bilinear: 1
};

$root.armnnSerializer.TensorInfo = class TensorInfo {

    static decode(reader, position) {
        const $ = new $root.armnnSerializer.TensorInfo();
        $.dimensions = reader.array(position, 4, Uint32Array);
        $.dataType = reader.int8_(position, 6, 0);
        $.quantizationScale = reader.float32_(position, 8, 1);
        $.quantizationOffset = reader.int32_(position, 10, 0);
        $.quantizationScales = reader.array(position, 12, Float32Array);
        $.quantizationDim = reader.uint32_(position, 14, 0);
        $.dimensionality = reader.uint32_(position, 16, 1);
        return $;
    }
};

$root.armnnSerializer.Connection = class Connection {
    static decode(reader, position) {
        throw new flatbuffers.Error("'struct' decode not supported.");
    }
};

$root.armnnSerializer.ByteData = class ByteData {

    static decode(reader, position) {
        const $ = new $root.armnnSerializer.ByteData();
        $.data = reader.array(position, 4, Int8Array);
        return $;
    }
};

$root.armnnSerializer.ShortData = class ShortData {

    static decode(reader, position) {
        const $ = new $root.armnnSerializer.ShortData();
        $.data = reader.array(position, 4, Int16Array);
        return $;
    }
};

$root.armnnSerializer.IntData = class IntData {

    static decode(reader, position) {
        const $ = new $root.armnnSerializer.IntData();
        $.data = reader.array(position, 4, Int32Array);
        return $;
    }
};

$root.armnnSerializer.LongData = class LongData {

    static decode(reader, position) {
        const $ = new $root.armnnSerializer.LongData();
        $.data= reader.int64s_(position, 4);
        return $;
    }
};

$root.armnnSerializer.ConstTensorData = class {

    static decode(reader, position, type) {
        switch (type) {
            case 1: return $root.armnnSerializer.ByteData.decode(reader, position);
            case 2: return $root.armnnSerializer.ShortData.decode(reader, position);
            case 3: return $root.armnnSerializer.IntData.decode(reader, position);
            case 4: return $root.armnnSerializer.LongData.decode(reader, position);
        }
        return undefined;
    }

    static decodeText(reader, json, type) {
        switch (type) {
            case 'ByteData': return $root.armnnSerializer.ByteData.decodeText(reader, json);
            case 'ShortData': return $root.armnnSerializer.ShortData.decodeText(reader, json);
            case 'IntData': return $root.armnnSerializer.IntData.decodeText(reader, json);
            case 'LongData': return $root.armnnSerializer.LongData.decodeText(reader, json);
        }
        return undefined;
    }
};

$root.armnnSerializer.ConstTensor = class ConstTensor {

    static decode(reader, position) {
        const $ = new $root.armnnSerializer.ConstTensor();
        $.info = reader.object(position, 4, $root.armnnSerializer.TensorInfo.decode);
        $.data = reader.union_(position, 6, $root.armnnSerializer.ConstTensorData.decode);
        return $;
    }
};

$root.armnnSerializer.InputSlot = class InputSlot {

    static decode(reader, position) {
        const $ = new $root.armnnSerializer.InputSlot();
        $.index = reader.uint32_(position, 4, 0);
        $.connection = reader.object(position, 6, $root.armnnSerializer.Connection.decode);
        return $;
    }
};

$root.armnnSerializer.OutputSlot = class OutputSlot {

    static decode(reader, position) {
        const $ = new $root.armnnSerializer.OutputSlot();
        $.index = reader.uint32_(position, 4, 0);
        $.tensorInfo = reader.object(position, 6, $root.armnnSerializer.TensorInfo.decode);
        return $;
    }
};

$root.armnnSerializer.LayerType = {
    Addition: 0,
    Input: 1,
    Multiplication: 2,
    Output: 3,
    Pooling2d: 4,
    Reshape: 5,
    Softmax: 6,
    Convolution2d: 7,
    DepthwiseConvolution2d: 8,
    Activation: 9,
    Permute: 10,
    FullyConnected: 11,
    Constant: 12,
    SpaceToBatchNd: 13,
    BatchToSpaceNd: 14,
    Division: 15,
    Minimum: 16,
    Equal: 17,
    Maximum: 18,
    Normalization: 19,
    Pad: 20,
    Rsqrt: 21,
    Floor: 22,
    BatchNormalization: 23,
    Greater: 24,
    ResizeBilinear: 25,
    Subtraction: 26,
    StridedSlice: 27,
    Gather: 28,
    Mean: 29,
    Merger: 30,
    L2Normalization: 31,
    Splitter: 32,
    DetectionPostProcess: 33,
    Lstm: 34,
    Quantize: 35,
    Dequantize: 36,
    Merge: 37,
    Switch: 38,
    Concat: 39,
    SpaceToDepth: 40,
    Prelu: 41,
    TransposeConvolution2d: 42,
    Resize: 43,
    Stack: 44,
    QuantizedLstm: 45,
    Abs: 46,
    ArgMinMax: 47,
    Slice: 48,
    DepthToSpace: 49,
    InstanceNormalization: 50,
    LogSoftmax: 51,
    Comparison: 52,
    StandIn: 53,
    ElementwiseUnary: 54,
    Transpose: 55,
    QLstm: 56,
    Fill: 57,
    Rank: 58
};

$root.armnnSerializer.LayerBase = class LayerBase {

    static decode(reader, position) {
        const $ = new $root.armnnSerializer.LayerBase();
        $.index = reader.uint32_(position, 4, 0);
        $.layerName = reader.string_(position, 6, null);
        $.layerType = reader.uint32_(position, 8, 0);
        $.inputSlots = reader.array_(position, 10, $root.armnnSerializer.InputSlot.decode);
        $.outputSlots = reader.array_(position, 12, $root.armnnSerializer.OutputSlot.decode);
        return $;
    }
};

$root.armnnSerializer.BindableLayerBase = class BindableLayerBase {

    static decode(reader, position) {
        const $ = new $root.armnnSerializer.BindableLayerBase();
        $.base = reader.object(position, 4, $root.armnnSerializer.LayerBase.decode);
        $.layerBindingId = reader.int32_(position, 6, 0);
        return $;
    }
};

$root.armnnSerializer.AbsLayer = class AbsLayer {

    static decode(reader, position) {
        const $ = new $root.armnnSerializer.AbsLayer();
        $.base = reader.object(position, 4, $root.armnnSerializer.LayerBase.decode);
        return $;
    }
};

$root.armnnSerializer.ActivationLayer = class ActivationLayer {

    static decode(reader, position) {
        const $ = new $root.armnnSerializer.ActivationLayer();
        $.base = reader.object(position, 4, $root.armnnSerializer.LayerBase.decode);
        $.descriptor = reader.object(position, 6, $root.armnnSerializer.ActivationDescriptor.decode);
        return $;
    }
};

$root.armnnSerializer.ActivationDescriptor = class ActivationDescriptor {

    static decode(reader, position) {
        const $ = new $root.armnnSerializer.ActivationDescriptor();
        $.activationFunction = reader.int8_(position, 4, 0);
        $.a = reader.float32_(position, 6, 0);
        $.b = reader.float32_(position, 8, 0);
        return $;
    }
};

$root.armnnSerializer.AdditionLayer = class AdditionLayer {

    static decode(reader, position) {
        const $ = new $root.armnnSerializer.AdditionLayer();
        $.base = reader.object(position, 4, $root.armnnSerializer.LayerBase.decode);
        return $;
    }
};

$root.armnnSerializer.ArgMinMaxLayer = class ArgMinMaxLayer {

    static decode(reader, position) {
        const $ = new $root.armnnSerializer.ArgMinMaxLayer();
        $.base = reader.object(position, 4, $root.armnnSerializer.LayerBase.decode);
        $.descriptor = reader.object(position, 6, $root.armnnSerializer.ArgMinMaxDescriptor.decode);
        return $;
    }
};

$root.armnnSerializer.ArgMinMaxDescriptor = class ArgMinMaxDescriptor {

    static decode(reader, position) {
        const $ = new $root.armnnSerializer.ArgMinMaxDescriptor();
        $.argMinMaxFunction = reader.int8_(position, 4, 0);
        $.axis = reader.int32_(position, 6, 0);
        return $;
    }
};

$root.armnnSerializer.ComparisonOperation = {
    Equal: 0,
    Greater: 1,
    GreaterOrEqual: 2,
    Less: 3,
    LessOrEqual: 4,
    NotEqual: 5
};

$root.armnnSerializer.ComparisonDescriptor = class ComparisonDescriptor {

    static decode(reader, position) {
        const $ = new $root.armnnSerializer.ComparisonDescriptor();
        $.operation = reader.int8_(position, 4, 0);
        return $;
    }
};

$root.armnnSerializer.ComparisonLayer = class ComparisonLayer {

    static decode(reader, position) {
        const $ = new $root.armnnSerializer.ComparisonLayer();
        $.base = reader.object(position, 4, $root.armnnSerializer.LayerBase.decode);
        $.descriptor = reader.object(position, 6, $root.armnnSerializer.ComparisonDescriptor.decode);
        return $;
    }
};

$root.armnnSerializer.ConstantLayer = class ConstantLayer {

    static decode(reader, position) {
        const $ = new $root.armnnSerializer.ConstantLayer();
        $.base = reader.object(position, 4, $root.armnnSerializer.LayerBase.decode);
        $.input = reader.object(position, 6, $root.armnnSerializer.ConstTensor.decode);
        return $;
    }
};

$root.armnnSerializer.Convolution2dLayer = class Convolution2dLayer {

    static decode(reader, position) {
        const $ = new $root.armnnSerializer.Convolution2dLayer();
        $.base = reader.object(position, 4, $root.armnnSerializer.LayerBase.decode);
        $.descriptor = reader.object(position, 6, $root.armnnSerializer.Convolution2dDescriptor.decode);
        $.weights = reader.object(position, 8, $root.armnnSerializer.ConstTensor.decode);
        $.biases = reader.object(position, 10, $root.armnnSerializer.ConstTensor.decode);
        return $;
    }
};

$root.armnnSerializer.Convolution2dDescriptor = class Convolution2dDescriptor {

    static decode(reader, position) {
        const $ = new $root.armnnSerializer.Convolution2dDescriptor();
        $.padLeft = reader.uint32_(position, 4, 0);
        $.padRight = reader.uint32_(position, 6, 0);
        $.padTop = reader.uint32_(position, 8, 0);
        $.padBottom = reader.uint32_(position, 10, 0);
        $.strideX = reader.uint32_(position, 12, 0);
        $.strideY = reader.uint32_(position, 14, 0);
        $.dilationX = reader.uint32_(position, 16, 1);
        $.dilationY = reader.uint32_(position, 18, 1);
        $.biasEnabled = reader.bool_(position, 20, false);
        $.dataLayout = reader.int8_(position, 22, 1);
        return $;
    }
};

$root.armnnSerializer.DepthToSpaceLayer = class DepthToSpaceLayer {

    static decode(reader, position) {
        const $ = new $root.armnnSerializer.DepthToSpaceLayer();
        $.base = reader.object(position, 4, $root.armnnSerializer.LayerBase.decode);
        $.descriptor = reader.object(position, 6, $root.armnnSerializer.DepthToSpaceDescriptor.decode);
        return $;
    }
};

$root.armnnSerializer.DepthToSpaceDescriptor = class DepthToSpaceDescriptor {

    static decode(reader, position) {
        const $ = new $root.armnnSerializer.DepthToSpaceDescriptor();
        $.blockSize = reader.uint32_(position, 4, 0);
        $.dataLayout = reader.int8_(position, 6, 0);
        return $;
    }
};

$root.armnnSerializer.DivisionLayer = class DivisionLayer {

    static decode(reader, position) {
        const $ = new $root.armnnSerializer.DivisionLayer();
        $.base = reader.object(position, 4, $root.armnnSerializer.LayerBase.decode);
        return $;
    }
};

$root.armnnSerializer.UnaryOperation = {
    Abs: 0,
    Rsqrt: 1,
    Sqrt: 2,
    Exp: 3,
    Neg: 4
};

$root.armnnSerializer.ElementwiseUnaryDescriptor = class ElementwiseUnaryDescriptor {

    static decode(reader, position) {
        const $ = new $root.armnnSerializer.ElementwiseUnaryDescriptor();
        $.operation = reader.int8_(position, 4, 0);
        return $;
    }
};

$root.armnnSerializer.ElementwiseUnaryLayer = class ElementwiseUnaryLayer {

    static decode(reader, position) {
        const $ = new $root.armnnSerializer.ElementwiseUnaryLayer();
        $.base = reader.object(position, 4, $root.armnnSerializer.LayerBase.decode);
        $.descriptor = reader.object(position, 6, $root.armnnSerializer.ElementwiseUnaryDescriptor.decode);
        return $;
    }
};

$root.armnnSerializer.EqualLayer = class EqualLayer {

    static decode(reader, position) {
        const $ = new $root.armnnSerializer.EqualLayer();
        $.base = reader.object(position, 4, $root.armnnSerializer.LayerBase.decode);
        return $;
    }
};

$root.armnnSerializer.FillLayer = class FillLayer {

    static decode(reader, position) {
        const $ = new $root.armnnSerializer.FillLayer();
        $.base = reader.object(position, 4, $root.armnnSerializer.LayerBase.decode);
        $.descriptor = reader.object(position, 6, $root.armnnSerializer.FillDescriptor.decode);
        return $;
    }
};

$root.armnnSerializer.FillDescriptor = class FillDescriptor {

    static decode(reader, position) {
        const $ = new $root.armnnSerializer.FillDescriptor();
        $.value = reader.float32_(position, 4, 0);
        return $;
    }
};

$root.armnnSerializer.FloorLayer = class FloorLayer {

    static decode(reader, position) {
        const $ = new $root.armnnSerializer.FloorLayer();
        $.base = reader.object(position, 4, $root.armnnSerializer.LayerBase.decode);
        return $;
    }
};

$root.armnnSerializer.FullyConnectedLayer = class FullyConnectedLayer {

    static decode(reader, position) {
        const $ = new $root.armnnSerializer.FullyConnectedLayer();
        $.base = reader.object(position, 4, $root.armnnSerializer.LayerBase.decode);
        $.descriptor = reader.object(position, 6, $root.armnnSerializer.FullyConnectedDescriptor.decode);
        $.weights = reader.object(position, 8, $root.armnnSerializer.ConstTensor.decode);
        $.biases = reader.object(position, 10, $root.armnnSerializer.ConstTensor.decode);
        return $;
    }
};

$root.armnnSerializer.FullyConnectedDescriptor = class FullyConnectedDescriptor {

    static decode(reader, position) {
        const $ = new $root.armnnSerializer.FullyConnectedDescriptor();
        $.biasEnabled = reader.bool_(position, 4, false);
        $.transposeWeightsMatrix = reader.bool_(position, 6, false);
        return $;
    }
};

$root.armnnSerializer.GatherLayer = class GatherLayer {

    static decode(reader, position) {
        const $ = new $root.armnnSerializer.GatherLayer();
        $.base = reader.object(position, 4, $root.armnnSerializer.LayerBase.decode);
        $.descriptor = reader.object(position, 6, $root.armnnSerializer.GatherDescriptor.decode);
        return $;
    }
};

$root.armnnSerializer.GatherDescriptor = class GatherDescriptor {

    static decode(reader, position) {
        const $ = new $root.armnnSerializer.GatherDescriptor();
        $.axis = reader.int32_(position, 4, 0);
        return $;
    }
};

$root.armnnSerializer.GreaterLayer = class GreaterLayer {

    static decode(reader, position) {
        const $ = new $root.armnnSerializer.GreaterLayer();
        $.base = reader.object(position, 4, $root.armnnSerializer.LayerBase.decode);
        return $;
    }
};

$root.armnnSerializer.InputLayer = class InputLayer {

    static decode(reader, position) {
        const $ = new $root.armnnSerializer.InputLayer();
        $.base = reader.object(position, 4, $root.armnnSerializer.BindableLayerBase.decode);
        return $;
    }
};

$root.armnnSerializer.InstanceNormalizationLayer = class InstanceNormalizationLayer {

    static decode(reader, position) {
        const $ = new $root.armnnSerializer.InstanceNormalizationLayer();
        $.base = reader.object(position, 4, $root.armnnSerializer.LayerBase.decode);
        $.descriptor = reader.object(position, 6, $root.armnnSerializer.InstanceNormalizationDescriptor.decode);
        return $;
    }
};

$root.armnnSerializer.InstanceNormalizationDescriptor = class InstanceNormalizationDescriptor {

    static decode(reader, position) {
        const $ = new $root.armnnSerializer.InstanceNormalizationDescriptor();
        $.gamma = reader.float32_(position, 4, 0);
        $.beta = reader.float32_(position, 6, 0);
        $.eps = reader.float32_(position, 8, 0);
        $.dataLayout = reader.int8_(position, 10, 0);
        return $;
    }
};

$root.armnnSerializer.LogSoftmaxLayer = class LogSoftmaxLayer {

    static decode(reader, position) {
        const $ = new $root.armnnSerializer.LogSoftmaxLayer();
        $.base = reader.object(position, 4, $root.armnnSerializer.LayerBase.decode);
        $.descriptor = reader.object(position, 6, $root.armnnSerializer.LogSoftmaxDescriptor.decode);
        return $;
    }
};

$root.armnnSerializer.LogSoftmaxDescriptor = class LogSoftmaxDescriptor {

    static decode(reader, position) {
        const $ = new $root.armnnSerializer.LogSoftmaxDescriptor();
        $.beta = reader.float32_(position, 4, 1);
        $.axis = reader.int32_(position, 6, -1);
        return $;
    }
};

$root.armnnSerializer.L2NormalizationLayer = class L2NormalizationLayer {

    static decode(reader, position) {
        const $ = new $root.armnnSerializer.L2NormalizationLayer();
        $.base = reader.object(position, 4, $root.armnnSerializer.LayerBase.decode);
        $.descriptor = reader.object(position, 6, $root.armnnSerializer.L2NormalizationDescriptor.decode);
        return $;
    }
};

$root.armnnSerializer.L2NormalizationDescriptor = class L2NormalizationDescriptor {

    static decode(reader, position) {
        const $ = new $root.armnnSerializer.L2NormalizationDescriptor();
        $.dataLayout = reader.int8_(position, 4, 1);
        $.eps = reader.float32_(position, 6, 1e-12);
        return $;
    }
};

$root.armnnSerializer.MinimumLayer = class MinimumLayer {

    static decode(reader, position) {
        const $ = new $root.armnnSerializer.MinimumLayer();
        $.base = reader.object(position, 4, $root.armnnSerializer.LayerBase.decode);
        return $;
    }
};

$root.armnnSerializer.MaximumLayer = class MaximumLayer {

    static decode(reader, position) {
        const $ = new $root.armnnSerializer.MaximumLayer();
        $.base = reader.object(position, 4, $root.armnnSerializer.LayerBase.decode);
        return $;
    }
};

$root.armnnSerializer.MultiplicationLayer = class MultiplicationLayer {

    static decode(reader, position) {
        const $ = new $root.armnnSerializer.MultiplicationLayer();
        $.base = reader.object(position, 4, $root.armnnSerializer.LayerBase.decode);
        return $;
    }
};

$root.armnnSerializer.Pooling2dLayer = class Pooling2dLayer {

    static decode(reader, position) {
        const $ = new $root.armnnSerializer.Pooling2dLayer();
        $.base = reader.object(position, 4, $root.armnnSerializer.LayerBase.decode);
        $.descriptor = reader.object(position, 6, $root.armnnSerializer.Pooling2dDescriptor.decode);
        return $;
    }
};

$root.armnnSerializer.PoolingAlgorithm = {
    Max: 0,
    Average: 1,
    L2: 2
};

$root.armnnSerializer.OutputShapeRounding = {
    Floor: 0,
    Ceiling: 1
};

$root.armnnSerializer.PaddingMethod = {
    IgnoreValue: 0,
    Exclude: 1
};

$root.armnnSerializer.Pooling2dDescriptor = class Pooling2dDescriptor {

    static decode(reader, position) {
        const $ = new $root.armnnSerializer.Pooling2dDescriptor();
        $.poolType = reader.int8_(position, 4, 0);
        $.padLeft = reader.uint32_(position, 6, 0);
        $.padRight = reader.uint32_(position, 8, 0);
        $.padTop = reader.uint32_(position, 10, 0);
        $.padBottom = reader.uint32_(position, 12, 0);
        $.poolWidth = reader.uint32_(position, 14, 0);
        $.poolHeight = reader.uint32_(position, 16, 0);
        $.strideX = reader.uint32_(position, 18, 0);
        $.strideY = reader.uint32_(position, 20, 0);
        $.outputShapeRounding = reader.int8_(position, 22, 0);
        $.paddingMethod = reader.int8_(position, 24, 0);
        $.dataLayout = reader.int8_(position, 26, 0);
        return $;
    }
};

$root.armnnSerializer.QuantizeLayer = class QuantizeLayer {

    static decode(reader, position) {
        const $ = new $root.armnnSerializer.QuantizeLayer();
        $.base = reader.object(position, 4, $root.armnnSerializer.LayerBase.decode);
        return $;
    }
};

$root.armnnSerializer.SoftmaxLayer = class SoftmaxLayer {

    static decode(reader, position) {
        const $ = new $root.armnnSerializer.SoftmaxLayer();
        $.base = reader.object(position, 4, $root.armnnSerializer.LayerBase.decode);
        $.descriptor = reader.object(position, 6, $root.armnnSerializer.SoftmaxDescriptor.decode);
        return $;
    }
};

$root.armnnSerializer.SoftmaxDescriptor = class SoftmaxDescriptor {

    static decode(reader, position) {
        const $ = new $root.armnnSerializer.SoftmaxDescriptor();
        $.beta = reader.float32_(position, 4, 0);
        return $;
    }
};

$root.armnnSerializer.DepthwiseConvolution2dLayer = class DepthwiseConvolution2dLayer {

    static decode(reader, position) {
        const $ = new $root.armnnSerializer.DepthwiseConvolution2dLayer();
        $.base = reader.object(position, 4, $root.armnnSerializer.LayerBase.decode);
        $.descriptor = reader.object(position, 6, $root.armnnSerializer.DepthwiseConvolution2dDescriptor.decode);
        $.weights = reader.object(position, 8, $root.armnnSerializer.ConstTensor.decode);
        $.biases = reader.object(position, 10, $root.armnnSerializer.ConstTensor.decode);
        return $;
    }
};

$root.armnnSerializer.DepthwiseConvolution2dDescriptor = class DepthwiseConvolution2dDescriptor {

    static decode(reader, position) {
        const $ = new $root.armnnSerializer.DepthwiseConvolution2dDescriptor();
        $.padLeft = reader.uint32_(position, 4, 0);
        $.padRight = reader.uint32_(position, 6, 0);
        $.padTop = reader.uint32_(position, 8, 0);
        $.padBottom = reader.uint32_(position, 10, 0);
        $.strideX = reader.uint32_(position, 12, 0);
        $.strideY = reader.uint32_(position, 14, 0);
        $.dilationX = reader.uint32_(position, 16, 1);
        $.dilationY = reader.uint32_(position, 18, 1);
        $.biasEnabled = reader.bool_(position, 20, false);
        $.dataLayout = reader.int8_(position, 22, 1);
        return $;
    }
};

$root.armnnSerializer.OutputLayer = class OutputLayer {

    static decode(reader, position) {
        const $ = new $root.armnnSerializer.OutputLayer();
        $.base = reader.object(position, 4, $root.armnnSerializer.BindableLayerBase.decode);
        return $;
    }
};

$root.armnnSerializer.ReshapeLayer = class ReshapeLayer {

    static decode(reader, position) {
        const $ = new $root.armnnSerializer.ReshapeLayer();
        $.base = reader.object(position, 4, $root.armnnSerializer.LayerBase.decode);
        $.descriptor = reader.object(position, 6, $root.armnnSerializer.ReshapeDescriptor.decode);
        return $;
    }
};

$root.armnnSerializer.ReshapeDescriptor = class ReshapeDescriptor {

    static decode(reader, position) {
        const $ = new $root.armnnSerializer.ReshapeDescriptor();
        $.targetShape = reader.array(position, 4, Uint32Array);
        return $;
    }
};

$root.armnnSerializer.PermuteLayer = class PermuteLayer {

    static decode(reader, position) {
        const $ = new $root.armnnSerializer.PermuteLayer();
        $.base = reader.object(position, 4, $root.armnnSerializer.LayerBase.decode);
        $.descriptor = reader.object(position, 6, $root.armnnSerializer.PermuteDescriptor.decode);
        return $;
    }
};

$root.armnnSerializer.PermuteDescriptor = class PermuteDescriptor {

    static decode(reader, position) {
        const $ = new $root.armnnSerializer.PermuteDescriptor();
        $.dimMappings = reader.array(position, 4, Uint32Array);
        return $;
    }
};

$root.armnnSerializer.SpaceToBatchNdLayer = class SpaceToBatchNdLayer {

    static decode(reader, position) {
        const $ = new $root.armnnSerializer.SpaceToBatchNdLayer();
        $.base = reader.object(position, 4, $root.armnnSerializer.LayerBase.decode);
        $.descriptor = reader.object(position, 6, $root.armnnSerializer.SpaceToBatchNdDescriptor.decode);
        return $;
    }
};

$root.armnnSerializer.SpaceToBatchNdDescriptor = class SpaceToBatchNdDescriptor {

    static decode(reader, position) {
        const $ = new $root.armnnSerializer.SpaceToBatchNdDescriptor();
        $.blockShape = reader.array(position, 4, Uint32Array);
        $.padList = reader.array(position, 6, Uint32Array);
        $.dataLayout = reader.int8_(position, 8, 0);
        return $;
    }
};

$root.armnnSerializer.SpaceToDepthLayer = class SpaceToDepthLayer {

    static decode(reader, position) {
        const $ = new $root.armnnSerializer.SpaceToDepthLayer();
        $.base = reader.object(position, 4, $root.armnnSerializer.LayerBase.decode);
        $.descriptor = reader.object(position, 6, $root.armnnSerializer.SpaceToDepthDescriptor.decode);
        return $;
    }
};

$root.armnnSerializer.SpaceToDepthDescriptor = class SpaceToDepthDescriptor {

    static decode(reader, position) {
        const $ = new $root.armnnSerializer.SpaceToDepthDescriptor();
        $.blockSize = reader.uint32_(position, 4, 0);
        $.dataLayout = reader.int8_(position, 6, 0);
        return $;
    }
};

$root.armnnSerializer.SubtractionLayer = class SubtractionLayer {

    static decode(reader, position) {
        const $ = new $root.armnnSerializer.SubtractionLayer();
        $.base = reader.object(position, 4, $root.armnnSerializer.LayerBase.decode);
        return $;
    }
};

$root.armnnSerializer.BatchToSpaceNdLayer = class BatchToSpaceNdLayer {

    static decode(reader, position) {
        const $ = new $root.armnnSerializer.BatchToSpaceNdLayer();
        $.base = reader.object(position, 4, $root.armnnSerializer.LayerBase.decode);
        $.descriptor = reader.object(position, 6, $root.armnnSerializer.BatchToSpaceNdDescriptor.decode);
        return $;
    }
};

$root.armnnSerializer.BatchToSpaceNdDescriptor = class BatchToSpaceNdDescriptor {

    static decode(reader, position) {
        const $ = new $root.armnnSerializer.BatchToSpaceNdDescriptor();
        $.blockShape = reader.array(position, 4, Uint32Array);
        $.crops = reader.array(position, 6, Uint32Array);
        $.dataLayout = reader.int8_(position, 8, 0);
        return $;
    }
};

$root.armnnSerializer.NormalizationAlgorithmChannel = {
    Across: 0,
    Within: 1
};

$root.armnnSerializer.NormalizationAlgorithmMethod = {
    LocalBrightness: 0,
    LocalContrast: 1
};

$root.armnnSerializer.NormalizationLayer = class NormalizationLayer {

    static decode(reader, position) {
        const $ = new $root.armnnSerializer.NormalizationLayer();
        $.base = reader.object(position, 4, $root.armnnSerializer.LayerBase.decode);
        $.descriptor = reader.object(position, 6, $root.armnnSerializer.NormalizationDescriptor.decode);
        return $;
    }
};

$root.armnnSerializer.NormalizationDescriptor = class NormalizationDescriptor {

    static decode(reader, position) {
        const $ = new $root.armnnSerializer.NormalizationDescriptor();
        $.normChannelType = reader.int8_(position, 4, 0);
        $.normMethodType = reader.int8_(position, 6, 0);
        $.normSize = reader.uint32_(position, 8, 0);
        $.alpha = reader.float32_(position, 10, 0);
        $.beta = reader.float32_(position, 12, 0);
        $.k = reader.float32_(position, 14, 0);
        $.dataLayout = reader.int8_(position, 16, 1);
        return $;
    }
};

$root.armnnSerializer.MeanLayer = class MeanLayer {

    static decode(reader, position) {
        const $ = new $root.armnnSerializer.MeanLayer();
        $.base = reader.object(position, 4, $root.armnnSerializer.LayerBase.decode);
        $.descriptor = reader.object(position, 6, $root.armnnSerializer.MeanDescriptor.decode);
        return $;
    }
};

$root.armnnSerializer.MeanDescriptor = class MeanDescriptor {

    static decode(reader, position) {
        const $ = new $root.armnnSerializer.MeanDescriptor();
        $.axis = reader.array(position, 4, Uint32Array);
        $.keepDims = reader.bool_(position, 6, false);
        return $;
    }
};

$root.armnnSerializer.PadLayer = class PadLayer {

    static decode(reader, position) {
        const $ = new $root.armnnSerializer.PadLayer();
        $.base = reader.object(position, 4, $root.armnnSerializer.LayerBase.decode);
        $.descriptor = reader.object(position, 6, $root.armnnSerializer.PadDescriptor.decode);
        return $;
    }
};

$root.armnnSerializer.PadDescriptor = class PadDescriptor {

    static decode(reader, position) {
        const $ = new $root.armnnSerializer.PadDescriptor();
        $.padList = reader.array(position, 4, Uint32Array);
        $.padValue = reader.float32_(position, 6, 0);
        return $;
    }
};

$root.armnnSerializer.RsqrtLayer = class RsqrtLayer {

    static decode(reader, position) {
        const $ = new $root.armnnSerializer.RsqrtLayer();
        $.base = reader.object(position, 4, $root.armnnSerializer.LayerBase.decode);
        return $;
    }
};

$root.armnnSerializer.BatchNormalizationLayer = class BatchNormalizationLayer {

    static decode(reader, position) {
        const $ = new $root.armnnSerializer.BatchNormalizationLayer();
        $.base = reader.object(position, 4, $root.armnnSerializer.LayerBase.decode);
        $.descriptor = reader.object(position, 6, $root.armnnSerializer.BatchNormalizationDescriptor.decode);
        $.mean = reader.object(position, 8, $root.armnnSerializer.ConstTensor.decode);
        $.variance = reader.object(position, 10, $root.armnnSerializer.ConstTensor.decode);
        $.beta = reader.object(position, 12, $root.armnnSerializer.ConstTensor.decode);
        $.gamma = reader.object(position, 14, $root.armnnSerializer.ConstTensor.decode);
        return $;
    }
};

$root.armnnSerializer.BatchNormalizationDescriptor = class BatchNormalizationDescriptor {

    static decode(reader, position) {
        const $ = new $root.armnnSerializer.BatchNormalizationDescriptor();
        $.eps = reader.float32_(position, 4, 0);
        $.dataLayout = reader.int8_(position, 6, 0);
        return $;
    }
};

$root.armnnSerializer.ResizeBilinearLayer = class ResizeBilinearLayer {

    static decode(reader, position) {
        const $ = new $root.armnnSerializer.ResizeBilinearLayer();
        $.base = reader.object(position, 4, $root.armnnSerializer.LayerBase.decode);
        $.descriptor = reader.object(position, 6, $root.armnnSerializer.ResizeBilinearDescriptor.decode);
        return $;
    }
};

$root.armnnSerializer.ResizeBilinearDescriptor = class ResizeBilinearDescriptor {

    static decode(reader, position) {
        const $ = new $root.armnnSerializer.ResizeBilinearDescriptor();
        $.targetWidth = reader.uint32_(position, 4, 0);
        $.targetHeight = reader.uint32_(position, 6, 0);
        $.dataLayout = reader.int8_(position, 8, 0);
        $.alignCorners = reader.bool_(position, 10, false);
        $.halfPixelCenters = reader.bool_(position, 12, false);
        return $;
    }
};

$root.armnnSerializer.SliceLayer = class SliceLayer {

    static decode(reader, position) {
        const $ = new $root.armnnSerializer.SliceLayer();
        $.base = reader.object(position, 4, $root.armnnSerializer.LayerBase.decode);
        $.descriptor = reader.object(position, 6, $root.armnnSerializer.SliceDescriptor.decode);
        return $;
    }
};

$root.armnnSerializer.SliceDescriptor = class SliceDescriptor {

    static decode(reader, position) {
        const $ = new $root.armnnSerializer.SliceDescriptor();
        $.begin = reader.array(position, 4, Uint32Array);
        $.size = reader.array(position, 6, Uint32Array);
        return $;
    }
};

$root.armnnSerializer.StridedSliceLayer = class StridedSliceLayer {

    static decode(reader, position) {
        const $ = new $root.armnnSerializer.StridedSliceLayer();
        $.base = reader.object(position, 4, $root.armnnSerializer.LayerBase.decode);
        $.descriptor = reader.object(position, 6, $root.armnnSerializer.StridedSliceDescriptor.decode);
        return $;
    }
};

$root.armnnSerializer.StridedSliceDescriptor = class StridedSliceDescriptor {

    static decode(reader, position) {
        const $ = new $root.armnnSerializer.StridedSliceDescriptor();
        $.begin = reader.array(position, 4, Int32Array);
        $.end = reader.array(position, 6, Int32Array);
        $.stride = reader.array(position, 8, Int32Array);
        $.beginMask = reader.int32_(position, 10, 0);
        $.endMask = reader.int32_(position, 12, 0);
        $.shrinkAxisMask = reader.int32_(position, 14, 0);
        $.ellipsisMask = reader.int32_(position, 16, 0);
        $.newAxisMask = reader.int32_(position, 18, 0);
        $.dataLayout = reader.int8_(position, 20, 0);
        return $;
    }
};

$root.armnnSerializer.ConcatLayer = class ConcatLayer {

    static decode(reader, position) {
        const $ = new $root.armnnSerializer.ConcatLayer();
        $.base = reader.object(position, 4, $root.armnnSerializer.LayerBase.decode);
        $.descriptor = reader.object(position, 6, $root.armnnSerializer.OriginsDescriptor.decode);
        return $;
    }
};

$root.armnnSerializer.MergerLayer = class MergerLayer {

    static decode(reader, position) {
        const $ = new $root.armnnSerializer.MergerLayer();
        $.base = reader.object(position, 4, $root.armnnSerializer.LayerBase.decode);
        $.descriptor = reader.object(position, 6, $root.armnnSerializer.OriginsDescriptor.decode);
        return $;
    }
};

$root.armnnSerializer.UintVector = class UintVector {

    static decode(reader, position) {
        const $ = new $root.armnnSerializer.UintVector();
        $.data = reader.array(position, 4, Uint32Array);
        return $;
    }
};

$root.armnnSerializer.OriginsDescriptor = class OriginsDescriptor {

    static decode(reader, position) {
        const $ = new $root.armnnSerializer.OriginsDescriptor();
        $.concatAxis = reader.uint32_(position, 4, 0);
        $.numViews = reader.uint32_(position, 6, 0);
        $.numDimensions = reader.uint32_(position, 8, 0);
        $.viewOrigins = reader.array_(position, 10, $root.armnnSerializer.UintVector.decode);
        return $;
    }
};

$root.armnnSerializer.ViewsDescriptor = class ViewsDescriptor {

    static decode(reader, position) {
        const $ = new $root.armnnSerializer.ViewsDescriptor();
        $.origins = reader.object(position, 4, $root.armnnSerializer.OriginsDescriptor.decode);
        $.viewSizes = reader.array_(position, 6, $root.armnnSerializer.UintVector.decode);
        return $;
    }
};

$root.armnnSerializer.SplitterLayer = class SplitterLayer {

    static decode(reader, position) {
        const $ = new $root.armnnSerializer.SplitterLayer();
        $.base = reader.object(position, 4, $root.armnnSerializer.LayerBase.decode);
        $.descriptor = reader.object(position, 6, $root.armnnSerializer.ViewsDescriptor.decode);
        return $;
    }
};

$root.armnnSerializer.DetectionPostProcessLayer = class DetectionPostProcessLayer {

    static decode(reader, position) {
        const $ = new $root.armnnSerializer.DetectionPostProcessLayer();
        $.base = reader.object(position, 4, $root.armnnSerializer.LayerBase.decode);
        $.descriptor = reader.object(position, 6, $root.armnnSerializer.DetectionPostProcessDescriptor.decode);
        $.anchors = reader.object(position, 8, $root.armnnSerializer.ConstTensor.decode);
        return $;
    }
};

$root.armnnSerializer.DetectionPostProcessDescriptor = class DetectionPostProcessDescriptor {

    static decode(reader, position) {
        const $ = new $root.armnnSerializer.DetectionPostProcessDescriptor();
        $.maxDetections = reader.uint32_(position, 4, 0);
        $.maxClassesPerDetection = reader.uint32_(position, 6, 0);
        $.detectionsPerClass = reader.uint32_(position, 8, 0);
        $.nmsScoreThreshold = reader.float32_(position, 10, 0);
        $.nmsIouThreshold = reader.float32_(position, 12, 0);
        $.numClasses = reader.uint32_(position, 14, 0);
        $.useRegularNms = reader.bool_(position, 16, false);
        $.scaleX = reader.float32_(position, 18, 0);
        $.scaleY = reader.float32_(position, 20, 0);
        $.scaleW = reader.float32_(position, 22, 0);
        $.scaleH = reader.float32_(position, 24, 0);
        return $;
    }
};

$root.armnnSerializer.LstmInputParams = class LstmInputParams {

    static decode(reader, position) {
        const $ = new $root.armnnSerializer.LstmInputParams();
        $.inputToForgetWeights = reader.object(position, 4, $root.armnnSerializer.ConstTensor.decode);
        $.inputToCellWeights = reader.object(position, 6, $root.armnnSerializer.ConstTensor.decode);
        $.inputToOutputWeights = reader.object(position, 8, $root.armnnSerializer.ConstTensor.decode);
        $.recurrentToForgetWeights = reader.object(position, 10, $root.armnnSerializer.ConstTensor.decode);
        $.recurrentToCellWeights = reader.object(position, 12, $root.armnnSerializer.ConstTensor.decode);
        $.recurrentToOutputWeights = reader.object(position, 14, $root.armnnSerializer.ConstTensor.decode);
        $.forgetGateBias = reader.object(position, 16, $root.armnnSerializer.ConstTensor.decode);
        $.cellBias = reader.object(position, 18, $root.armnnSerializer.ConstTensor.decode);
        $.outputGateBias = reader.object(position, 20, $root.armnnSerializer.ConstTensor.decode);
        $.inputToInputWeights = reader.object(position, 22, $root.armnnSerializer.ConstTensor.decode);
        $.recurrentToInputWeights = reader.object(position, 24, $root.armnnSerializer.ConstTensor.decode);
        $.cellToInputWeights = reader.object(position, 26, $root.armnnSerializer.ConstTensor.decode);
        $.inputGateBias = reader.object(position, 28, $root.armnnSerializer.ConstTensor.decode);
        $.projectionWeights = reader.object(position, 30, $root.armnnSerializer.ConstTensor.decode);
        $.projectionBias = reader.object(position, 32, $root.armnnSerializer.ConstTensor.decode);
        $.cellToForgetWeights = reader.object(position, 34, $root.armnnSerializer.ConstTensor.decode);
        $.cellToOutputWeights = reader.object(position, 36, $root.armnnSerializer.ConstTensor.decode);
        $.inputLayerNormWeights = reader.object(position, 38, $root.armnnSerializer.ConstTensor.decode);
        $.forgetLayerNormWeights = reader.object(position, 40, $root.armnnSerializer.ConstTensor.decode);
        $.cellLayerNormWeights = reader.object(position, 42, $root.armnnSerializer.ConstTensor.decode);
        $.outputLayerNormWeights = reader.object(position, 44, $root.armnnSerializer.ConstTensor.decode);
        return $;
    }
};

$root.armnnSerializer.LstmDescriptor = class LstmDescriptor {

    static decode(reader, position) {
        const $ = new $root.armnnSerializer.LstmDescriptor();
        $.activationFunc = reader.uint32_(position, 4, 0);
        $.clippingThresCell = reader.float32_(position, 6, 0);
        $.clippingThresProj = reader.float32_(position, 8, 0);
        $.cifgEnabled = reader.bool_(position, 10, true);
        $.peepholeEnabled = reader.bool_(position, 12, false);
        $.projectionEnabled = reader.bool_(position, 14, false);
        $.layerNormEnabled = reader.bool_(position, 16, false);
        return $;
    }
};

$root.armnnSerializer.LstmLayer = class LstmLayer {

    static decode(reader, position) {
        const $ = new $root.armnnSerializer.LstmLayer();
        $.base = reader.object(position, 4, $root.armnnSerializer.LayerBase.decode);
        $.descriptor = reader.object(position, 6, $root.armnnSerializer.LstmDescriptor.decode);
        $.inputParams = reader.object(position, 8, $root.armnnSerializer.LstmInputParams.decode);
        return $;
    }
};

$root.armnnSerializer.QLstmInputParams = class QLstmInputParams {

    static decode(reader, position) {
        const $ = new $root.armnnSerializer.QLstmInputParams();
        $.inputToForgetWeights = reader.object(position, 4, $root.armnnSerializer.ConstTensor.decode);
        $.inputToCellWeights = reader.object(position, 6, $root.armnnSerializer.ConstTensor.decode);
        $.inputToOutputWeights = reader.object(position, 8, $root.armnnSerializer.ConstTensor.decode);
        $.recurrentToForgetWeights = reader.object(position, 10, $root.armnnSerializer.ConstTensor.decode);
        $.recurrentToCellWeights = reader.object(position, 12, $root.armnnSerializer.ConstTensor.decode);
        $.recurrentToOutputWeights = reader.object(position, 14, $root.armnnSerializer.ConstTensor.decode);
        $.forgetGateBias = reader.object(position, 16, $root.armnnSerializer.ConstTensor.decode);
        $.cellBias = reader.object(position, 18, $root.armnnSerializer.ConstTensor.decode);
        $.outputGateBias = reader.object(position, 20, $root.armnnSerializer.ConstTensor.decode);
        $.inputToInputWeights = reader.object(position, 22, $root.armnnSerializer.ConstTensor.decode);
        $.recurrentToInputWeights = reader.object(position, 24, $root.armnnSerializer.ConstTensor.decode);
        $.inputGateBias = reader.object(position, 26, $root.armnnSerializer.ConstTensor.decode);
        $.projectionWeights = reader.object(position, 28, $root.armnnSerializer.ConstTensor.decode);
        $.projectionBias = reader.object(position, 30, $root.armnnSerializer.ConstTensor.decode);
        $.cellToInputWeights = reader.object(position, 32, $root.armnnSerializer.ConstTensor.decode);
        $.cellToForgetWeights = reader.object(position, 34, $root.armnnSerializer.ConstTensor.decode);
        $.cellToOutputWeights = reader.object(position, 36, $root.armnnSerializer.ConstTensor.decode);
        $.inputLayerNormWeights = reader.object(position, 38, $root.armnnSerializer.ConstTensor.decode);
        $.forgetLayerNormWeights = reader.object(position, 40, $root.armnnSerializer.ConstTensor.decode);
        $.cellLayerNormWeights = reader.object(position, 42, $root.armnnSerializer.ConstTensor.decode);
        $.outputLayerNormWeights = reader.object(position, 44, $root.armnnSerializer.ConstTensor.decode);
        return $;
    }
};

$root.armnnSerializer.QLstmDescriptor = class QLstmDescriptor {

    static decode(reader, position) {
        const $ = new $root.armnnSerializer.QLstmDescriptor();
        $.cifgEnabled = reader.bool_(position, 4, true);
        $.peepholeEnabled = reader.bool_(position, 6, false);
        $.projectionEnabled = reader.bool_(position, 8, false);
        $.layerNormEnabled = reader.bool_(position, 10, false);
        $.cellClip = reader.float32_(position, 12, 0);
        $.projectionClip = reader.float32_(position, 14, 0);
        $.inputIntermediateScale = reader.float32_(position, 16, 0);
        $.forgetIntermediateScale = reader.float32_(position, 18, 0);
        $.cellIntermediateScale = reader.float32_(position, 20, 0);
        $.outputIntermediateScale = reader.float32_(position, 22, 0);
        $.hiddenStateZeroPoint = reader.int32_(position, 24, 0);
        $.hiddenStateScale = reader.float32_(position, 26, 0);
        return $;
    }
};

$root.armnnSerializer.QLstmLayer = class QLstmLayer {

    static decode(reader, position) {
        const $ = new $root.armnnSerializer.QLstmLayer();
        $.base = reader.object(position, 4, $root.armnnSerializer.LayerBase.decode);
        $.descriptor = reader.object(position, 6, $root.armnnSerializer.QLstmDescriptor.decode);
        $.inputParams = reader.object(position, 8, $root.armnnSerializer.QLstmInputParams.decode);
        return $;
    }
};

$root.armnnSerializer.QuantizedLstmInputParams = class QuantizedLstmInputParams {

    static decode(reader, position) {
        const $ = new $root.armnnSerializer.QuantizedLstmInputParams();
        $.inputToInputWeights = reader.object(position, 4, $root.armnnSerializer.ConstTensor.decode);
        $.inputToForgetWeights = reader.object(position, 6, $root.armnnSerializer.ConstTensor.decode);
        $.inputToCellWeights = reader.object(position, 8, $root.armnnSerializer.ConstTensor.decode);
        $.inputToOutputWeights = reader.object(position, 10, $root.armnnSerializer.ConstTensor.decode);
        $.recurrentToInputWeights = reader.object(position, 12, $root.armnnSerializer.ConstTensor.decode);
        $.recurrentToForgetWeights = reader.object(position, 14, $root.armnnSerializer.ConstTensor.decode);
        $.recurrentToCellWeights = reader.object(position, 16, $root.armnnSerializer.ConstTensor.decode);
        $.recurrentToOutputWeights = reader.object(position, 18, $root.armnnSerializer.ConstTensor.decode);
        $.inputGateBias = reader.object(position, 20, $root.armnnSerializer.ConstTensor.decode);
        $.forgetGateBias = reader.object(position, 22, $root.armnnSerializer.ConstTensor.decode);
        $.cellBias = reader.object(position, 24, $root.armnnSerializer.ConstTensor.decode);
        $.outputGateBias = reader.object(position, 26, $root.armnnSerializer.ConstTensor.decode);
        return $;
    }
};

$root.armnnSerializer.QuantizedLstmLayer = class QuantizedLstmLayer {

    static decode(reader, position) {
        const $ = new $root.armnnSerializer.QuantizedLstmLayer();
        $.base = reader.object(position, 4, $root.armnnSerializer.LayerBase.decode);
        $.inputParams = reader.object(position, 6, $root.armnnSerializer.QuantizedLstmInputParams.decode);
        return $;
    }
};

$root.armnnSerializer.DequantizeLayer = class DequantizeLayer {

    static decode(reader, position) {
        const $ = new $root.armnnSerializer.DequantizeLayer();
        $.base = reader.object(position, 4, $root.armnnSerializer.LayerBase.decode);
        return $;
    }
};

$root.armnnSerializer.MergeLayer = class MergeLayer {

    static decode(reader, position) {
        const $ = new $root.armnnSerializer.MergeLayer();
        $.base = reader.object(position, 4, $root.armnnSerializer.LayerBase.decode);
        return $;
    }
};

$root.armnnSerializer.SwitchLayer = class SwitchLayer {

    static decode(reader, position) {
        const $ = new $root.armnnSerializer.SwitchLayer();
        $.base = reader.object(position, 4, $root.armnnSerializer.LayerBase.decode);
        return $;
    }
};

$root.armnnSerializer.PreluLayer = class PreluLayer {

    static decode(reader, position) {
        const $ = new $root.armnnSerializer.PreluLayer();
        $.base = reader.object(position, 4, $root.armnnSerializer.LayerBase.decode);
        return $;
    }
};

$root.armnnSerializer.TransposeConvolution2dLayer = class TransposeConvolution2dLayer {

    static decode(reader, position) {
        const $ = new $root.armnnSerializer.TransposeConvolution2dLayer();
        $.base = reader.object(position, 4, $root.armnnSerializer.LayerBase.decode);
        $.descriptor = reader.object(position, 6, $root.armnnSerializer.TransposeConvolution2dDescriptor.decode);
        $.weights = reader.object(position, 8, $root.armnnSerializer.ConstTensor.decode);
        $.biases = reader.object(position, 10, $root.armnnSerializer.ConstTensor.decode);
        return $;
    }
};

$root.armnnSerializer.TransposeConvolution2dDescriptor = class TransposeConvolution2dDescriptor {

    static decode(reader, position) {
        const $ = new $root.armnnSerializer.TransposeConvolution2dDescriptor();
        $.padLeft = reader.uint32_(position, 4, 0);
        $.padRight = reader.uint32_(position, 6, 0);
        $.padTop = reader.uint32_(position, 8, 0);
        $.padBottom = reader.uint32_(position, 10, 0);
        $.strideX = reader.uint32_(position, 12, 0);
        $.strideY = reader.uint32_(position, 14, 0);
        $.biasEnabled = reader.bool_(position, 16, false);
        $.dataLayout = reader.int8_(position, 18, 1);
        return $;
    }
};

$root.armnnSerializer.TransposeLayer = class TransposeLayer {

    static decode(reader, position) {
        const $ = new $root.armnnSerializer.TransposeLayer();
        $.base = reader.object(position, 4, $root.armnnSerializer.LayerBase.decode);
        $.descriptor = reader.object(position, 6, $root.armnnSerializer.TransposeDescriptor.decode);
        return $;
    }
};

$root.armnnSerializer.TransposeDescriptor = class TransposeDescriptor {

    static decode(reader, position) {
        const $ = new $root.armnnSerializer.TransposeDescriptor();
        $.dimMappings = reader.array(position, 4, Uint32Array);
        return $;
    }
};

$root.armnnSerializer.ResizeLayer = class ResizeLayer {

    static decode(reader, position) {
        const $ = new $root.armnnSerializer.ResizeLayer();
        $.base = reader.object(position, 4, $root.armnnSerializer.LayerBase.decode);
        $.descriptor = reader.object(position, 6, $root.armnnSerializer.ResizeDescriptor.decode);
        return $;
    }
};

$root.armnnSerializer.ResizeDescriptor = class ResizeDescriptor {

    static decode(reader, position) {
        const $ = new $root.armnnSerializer.ResizeDescriptor();
        $.targetHeight = reader.uint32_(position, 4, 0);
        $.targetWidth = reader.uint32_(position, 6, 0);
        $.method = reader.int8_(position, 8, 0);
        $.dataLayout = reader.int8_(position, 10, 0);
        $.alignCorners = reader.bool_(position, 12, false);
        $.halfPixelCenters = reader.bool_(position, 14, false);
        return $;
    }
};

$root.armnnSerializer.StackLayer = class StackLayer {

    static decode(reader, position) {
        const $ = new $root.armnnSerializer.StackLayer();
        $.base = reader.object(position, 4, $root.armnnSerializer.LayerBase.decode);
        $.descriptor = reader.object(position, 6, $root.armnnSerializer.StackDescriptor.decode);
        return $;
    }
};

$root.armnnSerializer.StackDescriptor = class StackDescriptor {

    static decode(reader, position) {
        const $ = new $root.armnnSerializer.StackDescriptor();
        $.axis = reader.uint32_(position, 4, 0);
        $.numInputs = reader.uint32_(position, 6, 0);
        $.inputShape = reader.array(position, 8, Uint32Array);
        return $;
    }
};

$root.armnnSerializer.StandInDescriptor = class StandInDescriptor {

    static decode(reader, position) {
        const $ = new $root.armnnSerializer.StandInDescriptor();
        $.numInputs = reader.uint32_(position, 4, 0);
        $.numOutputs = reader.uint32_(position, 6, 0);
        return $;
    }
};

$root.armnnSerializer.StandInLayer = class StandInLayer {

    static decode(reader, position) {
        const $ = new $root.armnnSerializer.StandInLayer();
        $.base = reader.object(position, 4, $root.armnnSerializer.LayerBase.decode);
        $.descriptor = reader.object(position, 6, $root.armnnSerializer.StandInDescriptor.decode);
        return $;
    }
};

$root.armnnSerializer.RankLayer = class RankLayer {

    static decode(reader, position) {
        const $ = new $root.armnnSerializer.RankLayer();
        $.base = reader.object(position, 4, $root.armnnSerializer.LayerBase.decode);
        return $;
    }
};

$root.armnnSerializer.Layer = class {

    static decode(reader, position, type) {
        switch (type) {
            case 1: return $root.armnnSerializer.ActivationLayer.decode(reader, position);
            case 2: return $root.armnnSerializer.AdditionLayer.decode(reader, position);
            case 3: return $root.armnnSerializer.BatchToSpaceNdLayer.decode(reader, position);
            case 4: return $root.armnnSerializer.BatchNormalizationLayer.decode(reader, position);
            case 5: return $root.armnnSerializer.ConstantLayer.decode(reader, position);
            case 6: return $root.armnnSerializer.Convolution2dLayer.decode(reader, position);
            case 7: return $root.armnnSerializer.DepthwiseConvolution2dLayer.decode(reader, position);
            case 8: return $root.armnnSerializer.FullyConnectedLayer.decode(reader, position);
            case 9: return $root.armnnSerializer.InputLayer.decode(reader, position);
            case 10: return $root.armnnSerializer.MultiplicationLayer.decode(reader, position);
            case 11: return $root.armnnSerializer.OutputLayer.decode(reader, position);
            case 12: return $root.armnnSerializer.PermuteLayer.decode(reader, position);
            case 13: return $root.armnnSerializer.Pooling2dLayer.decode(reader, position);
            case 14: return $root.armnnSerializer.ReshapeLayer.decode(reader, position);
            case 15: return $root.armnnSerializer.SoftmaxLayer.decode(reader, position);
            case 16: return $root.armnnSerializer.SpaceToBatchNdLayer.decode(reader, position);
            case 17: return $root.armnnSerializer.DivisionLayer.decode(reader, position);
            case 18: return $root.armnnSerializer.MinimumLayer.decode(reader, position);
            case 19: return $root.armnnSerializer.EqualLayer.decode(reader, position);
            case 20: return $root.armnnSerializer.MaximumLayer.decode(reader, position);
            case 21: return $root.armnnSerializer.NormalizationLayer.decode(reader, position);
            case 22: return $root.armnnSerializer.PadLayer.decode(reader, position);
            case 23: return $root.armnnSerializer.RsqrtLayer.decode(reader, position);
            case 24: return $root.armnnSerializer.FloorLayer.decode(reader, position);
            case 25: return $root.armnnSerializer.GreaterLayer.decode(reader, position);
            case 26: return $root.armnnSerializer.ResizeBilinearLayer.decode(reader, position);
            case 27: return $root.armnnSerializer.SubtractionLayer.decode(reader, position);
            case 28: return $root.armnnSerializer.StridedSliceLayer.decode(reader, position);
            case 29: return $root.armnnSerializer.GatherLayer.decode(reader, position);
            case 30: return $root.armnnSerializer.MeanLayer.decode(reader, position);
            case 31: return $root.armnnSerializer.MergerLayer.decode(reader, position);
            case 32: return $root.armnnSerializer.L2NormalizationLayer.decode(reader, position);
            case 33: return $root.armnnSerializer.SplitterLayer.decode(reader, position);
            case 34: return $root.armnnSerializer.DetectionPostProcessLayer.decode(reader, position);
            case 35: return $root.armnnSerializer.LstmLayer.decode(reader, position);
            case 36: return $root.armnnSerializer.QuantizedLstmLayer.decode(reader, position);
            case 37: return $root.armnnSerializer.QuantizeLayer.decode(reader, position);
            case 38: return $root.armnnSerializer.DequantizeLayer.decode(reader, position);
            case 39: return $root.armnnSerializer.MergeLayer.decode(reader, position);
            case 40: return $root.armnnSerializer.SwitchLayer.decode(reader, position);
            case 41: return $root.armnnSerializer.ConcatLayer.decode(reader, position);
            case 42: return $root.armnnSerializer.SpaceToDepthLayer.decode(reader, position);
            case 43: return $root.armnnSerializer.PreluLayer.decode(reader, position);
            case 44: return $root.armnnSerializer.TransposeConvolution2dLayer.decode(reader, position);
            case 45: return $root.armnnSerializer.ResizeLayer.decode(reader, position);
            case 46: return $root.armnnSerializer.StackLayer.decode(reader, position);
            case 47: return $root.armnnSerializer.AbsLayer.decode(reader, position);
            case 48: return $root.armnnSerializer.ArgMinMaxLayer.decode(reader, position);
            case 49: return $root.armnnSerializer.SliceLayer.decode(reader, position);
            case 50: return $root.armnnSerializer.DepthToSpaceLayer.decode(reader, position);
            case 51: return $root.armnnSerializer.InstanceNormalizationLayer.decode(reader, position);
            case 52: return $root.armnnSerializer.LogSoftmaxLayer.decode(reader, position);
            case 53: return $root.armnnSerializer.ComparisonLayer.decode(reader, position);
            case 54: return $root.armnnSerializer.StandInLayer.decode(reader, position);
            case 55: return $root.armnnSerializer.ElementwiseUnaryLayer.decode(reader, position);
            case 56: return $root.armnnSerializer.TransposeLayer.decode(reader, position);
            case 57: return $root.armnnSerializer.QLstmLayer.decode(reader, position);
            case 58: return $root.armnnSerializer.FillLayer.decode(reader, position);
            case 59: return $root.armnnSerializer.RankLayer.decode(reader, position);
        }
        return undefined;
    }

    static decodeText(reader, json, type) {
        switch (type) {
            case 'ActivationLayer': return $root.armnnSerializer.ActivationLayer.decodeText(reader, json);
            case 'AdditionLayer': return $root.armnnSerializer.AdditionLayer.decodeText(reader, json);
            case 'BatchToSpaceNdLayer': return $root.armnnSerializer.BatchToSpaceNdLayer.decodeText(reader, json);
            case 'BatchNormalizationLayer': return $root.armnnSerializer.BatchNormalizationLayer.decodeText(reader, json);
            case 'ConstantLayer': return $root.armnnSerializer.ConstantLayer.decodeText(reader, json);
            case 'Convolution2dLayer': return $root.armnnSerializer.Convolution2dLayer.decodeText(reader, json);
            case 'DepthwiseConvolution2dLayer': return $root.armnnSerializer.DepthwiseConvolution2dLayer.decodeText(reader, json);
            case 'FullyConnectedLayer': return $root.armnnSerializer.FullyConnectedLayer.decodeText(reader, json);
            case 'InputLayer': return $root.armnnSerializer.InputLayer.decodeText(reader, json);
            case 'MultiplicationLayer': return $root.armnnSerializer.MultiplicationLayer.decodeText(reader, json);
            case 'OutputLayer': return $root.armnnSerializer.OutputLayer.decodeText(reader, json);
            case 'PermuteLayer': return $root.armnnSerializer.PermuteLayer.decodeText(reader, json);
            case 'Pooling2dLayer': return $root.armnnSerializer.Pooling2dLayer.decodeText(reader, json);
            case 'ReshapeLayer': return $root.armnnSerializer.ReshapeLayer.decodeText(reader, json);
            case 'SoftmaxLayer': return $root.armnnSerializer.SoftmaxLayer.decodeText(reader, json);
            case 'SpaceToBatchNdLayer': return $root.armnnSerializer.SpaceToBatchNdLayer.decodeText(reader, json);
            case 'DivisionLayer': return $root.armnnSerializer.DivisionLayer.decodeText(reader, json);
            case 'MinimumLayer': return $root.armnnSerializer.MinimumLayer.decodeText(reader, json);
            case 'EqualLayer': return $root.armnnSerializer.EqualLayer.decodeText(reader, json);
            case 'MaximumLayer': return $root.armnnSerializer.MaximumLayer.decodeText(reader, json);
            case 'NormalizationLayer': return $root.armnnSerializer.NormalizationLayer.decodeText(reader, json);
            case 'PadLayer': return $root.armnnSerializer.PadLayer.decodeText(reader, json);
            case 'RsqrtLayer': return $root.armnnSerializer.RsqrtLayer.decodeText(reader, json);
            case 'FloorLayer': return $root.armnnSerializer.FloorLayer.decodeText(reader, json);
            case 'GreaterLayer': return $root.armnnSerializer.GreaterLayer.decodeText(reader, json);
            case 'ResizeBilinearLayer': return $root.armnnSerializer.ResizeBilinearLayer.decodeText(reader, json);
            case 'SubtractionLayer': return $root.armnnSerializer.SubtractionLayer.decodeText(reader, json);
            case 'StridedSliceLayer': return $root.armnnSerializer.StridedSliceLayer.decodeText(reader, json);
            case 'GatherLayer': return $root.armnnSerializer.GatherLayer.decodeText(reader, json);
            case 'MeanLayer': return $root.armnnSerializer.MeanLayer.decodeText(reader, json);
            case 'MergerLayer': return $root.armnnSerializer.MergerLayer.decodeText(reader, json);
            case 'L2NormalizationLayer': return $root.armnnSerializer.L2NormalizationLayer.decodeText(reader, json);
            case 'SplitterLayer': return $root.armnnSerializer.SplitterLayer.decodeText(reader, json);
            case 'DetectionPostProcessLayer': return $root.armnnSerializer.DetectionPostProcessLayer.decodeText(reader, json);
            case 'LstmLayer': return $root.armnnSerializer.LstmLayer.decodeText(reader, json);
            case 'QuantizedLstmLayer': return $root.armnnSerializer.QuantizedLstmLayer.decodeText(reader, json);
            case 'QuantizeLayer': return $root.armnnSerializer.QuantizeLayer.decodeText(reader, json);
            case 'DequantizeLayer': return $root.armnnSerializer.DequantizeLayer.decodeText(reader, json);
            case 'MergeLayer': return $root.armnnSerializer.MergeLayer.decodeText(reader, json);
            case 'SwitchLayer': return $root.armnnSerializer.SwitchLayer.decodeText(reader, json);
            case 'ConcatLayer': return $root.armnnSerializer.ConcatLayer.decodeText(reader, json);
            case 'SpaceToDepthLayer': return $root.armnnSerializer.SpaceToDepthLayer.decodeText(reader, json);
            case 'PreluLayer': return $root.armnnSerializer.PreluLayer.decodeText(reader, json);
            case 'TransposeConvolution2dLayer': return $root.armnnSerializer.TransposeConvolution2dLayer.decodeText(reader, json);
            case 'ResizeLayer': return $root.armnnSerializer.ResizeLayer.decodeText(reader, json);
            case 'StackLayer': return $root.armnnSerializer.StackLayer.decodeText(reader, json);
            case 'AbsLayer': return $root.armnnSerializer.AbsLayer.decodeText(reader, json);
            case 'ArgMinMaxLayer': return $root.armnnSerializer.ArgMinMaxLayer.decodeText(reader, json);
            case 'SliceLayer': return $root.armnnSerializer.SliceLayer.decodeText(reader, json);
            case 'DepthToSpaceLayer': return $root.armnnSerializer.DepthToSpaceLayer.decodeText(reader, json);
            case 'InstanceNormalizationLayer': return $root.armnnSerializer.InstanceNormalizationLayer.decodeText(reader, json);
            case 'LogSoftmaxLayer': return $root.armnnSerializer.LogSoftmaxLayer.decodeText(reader, json);
            case 'ComparisonLayer': return $root.armnnSerializer.ComparisonLayer.decodeText(reader, json);
            case 'StandInLayer': return $root.armnnSerializer.StandInLayer.decodeText(reader, json);
            case 'ElementwiseUnaryLayer': return $root.armnnSerializer.ElementwiseUnaryLayer.decodeText(reader, json);
            case 'TransposeLayer': return $root.armnnSerializer.TransposeLayer.decodeText(reader, json);
            case 'QLstmLayer': return $root.armnnSerializer.QLstmLayer.decodeText(reader, json);
            case 'FillLayer': return $root.armnnSerializer.FillLayer.decodeText(reader, json);
            case 'RankLayer': return $root.armnnSerializer.RankLayer.decodeText(reader, json);
        }
        return undefined;
    }
};

$root.armnnSerializer.AnyLayer = class AnyLayer {

    static decode(reader, position) {
        const $ = new $root.armnnSerializer.AnyLayer();
        $.layer = reader.union_(position, 4, $root.armnnSerializer.Layer.decode);
        return $;
    }
};

$root.armnnSerializer.FeatureCompatibilityVersions = class FeatureCompatibilityVersions {

    static decode(reader, position) {
        const $ = new $root.armnnSerializer.FeatureCompatibilityVersions();
        $.bindingIdsScheme = reader.uint32_(position, 4, 0);
        return $;
    }
};

$root.armnnSerializer.SerializedGraph = class SerializedGraph {

    static identifier(reader) {
        return reader.identifier('ARMN');
    }

    static create(reader) {
        return $root.armnnSerializer.SerializedGraph.decode(reader, reader.root);
    }

    static decode(reader, position) {
        const $ = new $root.armnnSerializer.SerializedGraph();
        $.layers = reader.array_(position, 4, $root.armnnSerializer.AnyLayer.decode);
        $.inputIds = reader.array(position, 6, Int32Array);
        $.outputIds = reader.array(position, 8, Int32Array);
        $.featureVersions = reader.object(position, 10, $root.armnnSerializer.FeatureCompatibilityVersions.decode);
        return $;
    }
};
