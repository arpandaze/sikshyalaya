part of 'resource_bloc.dart';

class ResourceState extends Equatable {
  final List<File>? resources;
  final bool resourceFetch;
  static const List<File>? defaultResources = [File.empty];

  const ResourceState(
      {this.resources = defaultResources, this.resourceFetch = false});

  ResourceState copyWith({
    List<File>? resources,
    bool? resourceFetch,
  }) {
    return ResourceState(
      resources: resources ?? this.resources,
      resourceFetch: resourceFetch ?? this.resourceFetch,
    );
  }

  @override
  List<Object?> get props => [resources, resourceFetch];
}
